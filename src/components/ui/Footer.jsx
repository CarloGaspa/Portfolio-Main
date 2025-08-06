import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border w-full py-3 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Compact contact info */}
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              Carlo Gasparini • Breda di Piave (TV), Italy
            </p>
          </div>

          {/* Compact policy links */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/privacy-policy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookie-policy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Compact copyright */}
        <div className="mt-2 text-center">
          <p className="text-[0.7rem] text-muted-foreground">
            © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
