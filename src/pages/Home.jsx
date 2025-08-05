import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useStore from "../store.js";

export default function Home() {
  const navigate = useNavigate();
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-5 px-6 lg:gap-24 lg:py-12">
      {/* Testo */}
      <div className="w-full lg:w-3/5 max-w-3xl text-center lg:text-left">
        <h1 className="text-foreground text-3xl sm:text-4xl md:text-6xl mb-3 break-words">
          Hi, I'm Carlo Gasparini
        </h1>
        <h2 className="text-2xl md:text-3xl text-accent font-semibold mb-6">
          Frontend Developer
        </h2>
        <p className="text-foreground text-base md:text-lg leading-relaxed">
          I'm a passionate frontend developer focused on creating clean,
          efficient, and user-friendly web experiences. I love transforming
          design ideas into interactive websites using modern technologies and
          best practices. When I'm not coding, I enjoy learning new tools and
          improving my skills to deliver the best results.
        </p>
        <div className="mt-4 lg:mt-10">
          <Button variant="custom" onClick={() => navigate("/Contact")}>
            Contact Me
          </Button>
        </div>
      </div>

      {/* Immagine */}
      <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 max-w-xs sm:max-w-md md:max-w-lg">
        <img
          src={isDarkMode ? "/profile-black.jpg" : "/profile-white.jpg"}
          alt="Foto profilo"
          className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}
