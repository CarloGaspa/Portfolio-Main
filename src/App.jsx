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
    <nav className="relative text-white font-bold px-6 py-2 sm:py-4 lg:py-5 flex items-center h-[60px] sm:h-auto">
      {/* Logo / Nome a sinistra */}
      <h1 className="text-2xl pl-4 hidden md:block">Carlo.</h1>

      {/* Link centrati */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4 whitespace-nowrap text-sm sm:text-base">
        {pages.map(({ path, name }) => (
          <Link
            key={path}
            to={path}
            className={`hover:text-myAccent ${
              location.pathname === path
                ? "border-b-2 border-myAccent text-myAccent"
                : ""
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-myBackground min-h-screen w-screen text-white">
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
  );
}

export default App;
