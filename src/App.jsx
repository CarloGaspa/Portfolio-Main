import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "./hooks/useTheme.js";
import { Toaster } from "sonner";
import useStore from "./store.js";
import { useEffect } from "react";

const pages = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    title: "Home | Carlo Gasparini",
    description:
      "Portfolio di Carlo Gasparini, sviluppatore frontend specializzato in React, Next.js e UI/UX design. Scopri i miei progetti e competenze.",
  },
  {
    path: "/About",
    name: "About",
    element: <About />,
    title: "About Me | Carlo Gasparini",
    description:
      "Chi sono Carlo Gasparini: esperienza, competenze tecniche e percorso professionale come sviluppatore frontend.",
  },
  {
    path: "/Services",
    name: "Services",
    element: <Services />,
    title: "Services | Web Development",
    description:
      "Servizi offerti da Carlo Gasparini: sviluppo web, creazione di interfacce responsive, ottimizzazione SEO e performance.",
  },
  {
    path: "/Portfolio",
    name: "Portfolio",
    element: <Portfolio />,
    title: "Portfolio | My Projects",
    description:
      "Raccolta dei migliori progetti di Carlo Gasparini: applicazioni web, siti responsive e soluzioni frontend innovative.",
  },
  {
    path: "/Contact",
    name: "Contact",
    element: <Contact />,
    title: "Contact | Get in Touch",
    description:
      "Contatta Carlo Gasparini per collaborazioni, opportunità lavorative o informazioni sui servizi di sviluppo frontend.",
  },
];

function PageTitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const currentPage = pages.find((page) => page.path === location.pathname);
    document.title = currentPage?.title || "Carlo Gasparini";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      currentPage?.description ||
      "Portfolio di Carlo Gasparini, Frontend Developer";
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    updateMetaTag(
      "keywords",
      currentPage?.keywords || "frontend, developer, portfolio, react"
    );
    updateMetaTag("og:title", currentPage?.title || "Carlo Gasparini");
  }, [location.pathname]);
  return null;
}

function Navbar() {
  const location = useLocation();
  return (
    <nav className="relative text-foreground font-bold px-6 py-2 sm:py-4 lg:py-5 flex items-center h-[60px] sm:h-auto">
      <h1 className="text-2xl pl-4 hidden md:block">Carlo.</h1>
      <div className="flex flex-1 items-center justify-center gap-4 whitespace-nowrap text-sm sm:text-base relative lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        {pages.map(({ path, name }) => (
          <Link
            key={path}
            to={path}
            className={`hover:text-accent ${
              location.pathname === path
                ? "border-b-2 border-accent text-accent"
                : ""
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="ml-2 flex items-center h-8 lg:absolute lg:right-3 lg:ml-0">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  useTheme();
  return (
    <>
      <Toaster
        richColors
        theme="auto"
        position="bottom-center"
        duration={5000}
        toastOptions={{
          style: {
            backgroundColor: isDarkMode ? "var(--card)" : "var(--card)",
            color: isDarkMode
              ? "var(--card-foreground)"
              : "var(--card-foreground)",
            boxShadow: isDarkMode
              ? "0 2px 6px rgba(14, 165, 233, 0.2)"
              : "0 2px 6px rgba(37, 99, 235, 0.1)",
            borderRadius: "var(--radius)",
            border: `1px solid ${
              isDarkMode ? "var(--border)" : "var(--border)"
            }`,
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 600,
          },
        }}
      />
      <BrowserRouter>
        <PageTitleUpdater />
        <div className="bg-Background min-h-screen w-screen text-white">
          <Navbar />
          <main className="px-4 pt-2 pb-8 sm:px-6 md:px-8">
            <Routes>
              {pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}
