import sgMail from "@sendgrid/mail";

const logger = {
  error: (message, error) => {
    console.log("\x1b[31m", "=== ERROR ===");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Message: ${message}`);
    console.log("Error details:", {
      message: error.message,
      ...(error.response && { response: error.response.body }),
    });
    console.log("\x1b[0m");
  },
  info: (message, data) => {
    console.log("\x1b[36m", "=== INFO ===");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Message: ${message}`);
    if (data) console.log("Additional data:", data);
    console.log("\x1b[0m");
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    logger.error("Method not allowed", { method: req.method });
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (!body || typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (err) {
      logger.error("Failed to parse body", err);
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    logger.error("Missing required fields", { body: req.body });
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    logger.error("Invalid email format", { email });
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!process.env.SENDGRID_API_KEY) {
    logger.error("SendGrid API key not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.TARGET_EMAIL,
    from: process.env.VERIFIED_SENDER,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `${name} (${email}): ${message}`,
    html: `<p><strong>${name}</strong> (${email}) says:</p><p>${message}</p>`,
  };

  try {
    logger.info("Attempting to send email", {
      to: msg.to,
      subject: msg.subject,
    });
    await sgMail.send(msg);
    logger.info("Email sent successfully", {
      to: msg.to,
      subject: msg.subject,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    let errorMessage = "Failed to send message";
    let errorDetails = {};
    if (error.response) {
      errorDetails = {
        statusCode: error.code,
        errors: error.response.body.errors,
        headers: error.response.headers,
      };
      errorMessage = error.response.body.errors
        .map((e) => `${e.field || ""}: ${e.message}`.trim())
        .join(" | ");
    } else {
      errorDetails = { message: error.message, stack: error.stack };
    }

    logger.error("SendGrid error", {
      error: errorMessage,
      details: errorDetails,
      emailData: { to: msg.to, from: msg.from, subject: msg.subject },
    });

    return res.status(500).json({ error: errorMessage });
  }
}
