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

const pages = [
  { path: "/", name: "Home", element: <Home /> },
  { path: "/About", name: "About", element: <About /> },
  { path: "/Services", name: "Services", element: <Services /> },
  { path: "/Portfolio", name: "Portfolio", element: <Portfolio /> },
  { path: "/Contact", name: "Contact", element: <Contact /> },
];

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
  useTheme();
  return (
    <>
      <Toaster richColors theme="" />
      <BrowserRouter>
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
