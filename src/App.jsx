import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import { useState } from "react";

function App() {
  const [pageSelected, setPageSelected] = useState("Home");
  return (
    <div className="bg-background min-h-screen w-screen text-white">
      <BrowserRouter>
        <nav className="relative bg-background text-white font-bold px-6 py-4 flex items-center">
          {/* Logo / Nome a sinistra */}
          <h1 className="text-xl pl-10">Carlo.</h1>

          {/* Link centrati */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-6">
            <Link
              to="/"
              className={`hover:text-accent ${
                pageSelected === "Home"
                  ? "border-b-2 border-accent text-accent"
                  : ""
              }`}
              onClick={() => setPageSelected("Home")}
            >
              Home
            </Link>
            <Link
              to="/About"
              className={`hover:text-accent ${
                pageSelected === "About"
                  ? "border-b-2 border-accent text-accent"
                  : ""
              }`}
              onClick={() => setPageSelected("About")}
            >
              About
            </Link>
            <Link
              to="/Services"
              className={`hover:text-accent ${
                pageSelected === "Services"
                  ? "border-b-2 border-accent text-accent"
                  : ""
              }`}
              onClick={() => setPageSelected("Services")}
            >
              Services
            </Link>
            <Link
              to="/Portfolio"
              className={`hover:text-accent ${
                pageSelected === "Portfolio"
                  ? "border-b-2 border-accent text-accent"
                  : ""
              }`}
              onClick={() => setPageSelected("Portfolio")}
            >
              Portfolio
            </Link>
            <Link
              to="/Contact"
              className={`hover:text-accent ${
                pageSelected === "Contact"
                  ? "border-b-2 border-accent text-accent"
                  : ""
              }`}
              onClick={() => setPageSelected("Contact")}
            >
              Contact
            </Link>{" "}
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Portfolio" element={<Portfolio />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
