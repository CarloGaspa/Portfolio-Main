import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function sendToTelegram(data) {
    const telegramToken = import.meta.env.VITE_TELEGRAM_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_ID;
    if (!telegramToken || !chatId) {
      console.error("Credenziali Telegram mancanti!");
      return false;
    }
    const apiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout di 5 secondi
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formatTelegramMessage(data),
          parse_mode: "HTML",
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Telegram API error: ${errorData.description || response.status}`
        );
      }
      return true;
    } catch (error) {
      console.error("Errore Telegram API:", {
        error: error.message,
        timestamp: new Date().toISOString(),
        data: {
          name: data.name,
          email: data.email,
          messageLength: data.message.length,
        },
      });
      return false;
    }
  }

  function formatTelegramMessage(data) {
    return `🚀 <b>Nuovo Messaggio</b> 🚀

<b>Nome</b>: ${escapeHTML(data.name)}
<b>Email</b>: ${escapeHTML(data.email)}

<b>Messaggio</b>:
${escapeHTML(data.message)}

<i>Inviato il ${new Date().toLocaleString("it-IT")}</i>`;
  }

  function escapeHTML(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeMarkdown(text) {
    return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, "\\$&");
  }

  async function onSubmit(data) {
    setIsLoading(true);

    // 1. Log iniziale con struttura standardizzata
    const logContext = {
      timestamp: new Date().toISOString(),
      formData: {
        name: data.name,
        email: data.email,
        messageLength: data.message.length, // Evita di loggare messaggi lunghi
      },
      session: {
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
    };

    console.groupCollapsed(
      `[ContactForm] Submission started at ${logContext.timestamp}`
    );
    console.log("Submission context:", logContext);
    console.groupEnd();

    try {
      // 1. Prima prova a inviare a Telegram
      console.log("[Telegram] Attempting to send message to Telegram...");
      const telegramSuccess = await sendToTelegram(data);

      if (telegramSuccess) {
        console.log("[Telegram] Message successfully sent to Telegram");
        toast.success("Message sent!", {
          description: "Thanks for reaching out. I'll get back to you soon!",
        });
        form.reset();
        return; // Esci se Telegram ha funzionato
      }

      // 2. Se Telegram fallisce, prova con l'email
      console.log("[Telegram] Failed, falling back to email...");
      const startTime = performance.now();

      console.log("Request headers:", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodySize: JSON.stringify(data).length,
      });

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseTime = performance.now() - startTime;

      // 3. Log della risposta con timing
      console.log(
        `[Network] Response received in ${responseTime.toFixed(2)}ms`,
        {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get("content-type"),
          size: response.headers.get("content-length") || "unknown",
        }
      );

      // 4. Gestione risposta più robusta
      let result = {};
      const responseText = await response.text();

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.warn("[Warning] Malformed JSON response:", {
          responseText,
          error: e.message,
        });
      }

      // 5. Log differenziato per stato
      if (!response.ok) {
        console.groupCollapsed(
          `[Error] Server responded with ${response.status}`
        );
        console.error(
          "Error details:",
          result.error || "No error details provided"
        );
        console.log("Full response:", result);
        console.groupEnd();

        throw new Error(result.error || `Server error: ${response.status}`);
      }

      // 6. Log di successo con analytics
      console.log("[Success] Form submitted successfully", {
        response: result,
        duration: responseTime,
      });

      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      form.reset();
    } catch (error) {
      // 7. Gestione errori avanzata
      const errorContext = {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        time: new Date().toISOString(),
      };

      console.groupCollapsed(`[Critical] Submission failed - ${error.message}`);
      console.error("Error details:", errorContext);
      console.log("Original form data:", logContext.formData);
      console.groupEnd();

      // 8. Messaggi toast differenziati
      const userMessage = error.message.includes("404")
        ? "Service temporarily unavailable"
        : error.message.includes("500")
        ? "Internal server error"
        : "There was an error sending your message";

      toast.error("Error", {
        description: userMessage,
      });

      // 9. Invia l'errore a un servizio di tracking (opzionale)
      if (typeof window.trackError === "function") {
        window.trackError("contact_form_error", {
          ...errorContext,
          ...logContext,
        });
      }
    } finally {
      setIsLoading(false);

      // 10. Log finale
      console.log("[Status] Form submission process completed");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-3 lg:mb-6 text-center text-foreground">
        Contact Me
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            rules={{
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[120px] text-foreground"
                    placeholder="Write your message here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>

      {/* Footer conforme alle normative */}
      <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground text-center">
        <p>Carlo Gasparini - 31030 Treviso, Italy</p>
        {/*         <p className="mt-1">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/unsubscribe" className="hover:underline">
            Unsubscribe
          </a>
        </p> */}
      </div>
    </div>
  );
}
