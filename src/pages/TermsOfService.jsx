import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service | Carlo Gasparini";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Terms of Service for Carlo Gasparini's portfolio website."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Terms of Service for Carlo Gasparini's portfolio website.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8  text-foreground">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="prose prose-sm dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, you agree to be bound by these terms and
            all applicable laws and regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the
            materials for personal, non-commercial use only.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
          <p>
            The materials on this site are provided “as is”. No warranties are
            expressed or implied.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
