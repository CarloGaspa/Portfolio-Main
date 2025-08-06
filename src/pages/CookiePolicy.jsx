import { useEffect } from "react";

export default function CookiePolicy() {
  useEffect(() => {
    document.title = "Cookie Policy | Carlo Gasparini";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Cookie policy for Carlo Gasparini's portfolio website."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Cookie policy for Carlo Gasparini's portfolio website.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <div className="prose prose-sm dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit
            websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p>
            We use cookies to analyze website traffic and enhance your browsing
            experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Managing Cookies</h2>
          <p>
            You can control and delete cookies through your browser settings.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
