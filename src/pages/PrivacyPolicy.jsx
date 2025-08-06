import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Carlo Gasparini";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Privacy policy for Carlo Gasparini's portfolio website"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Privacy policy for Carlo Gasparini's portfolio website";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8  text-foreground">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="prose prose-sm dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We may collect personal information such as your name, email
            address, and contact details when you fill out forms on our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">The information we collect may be used to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Respond to your inquiries</li>
            <li>Improve our website</li>
            <li>Send periodic emails</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Data Protection</h2>
          <p>
            We implement security measures to maintain the safety of your
            personal information.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
