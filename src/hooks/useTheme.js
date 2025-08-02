import useStore from "../store.js";
import { useEffect } from "react";

export function useTheme() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  // Applica la classe dark al root quando cambia il tema
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Sincronizza il tema con le preferenze di sistema all'avvio
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);

    setDarkMode(mediaQuery.matches); // tema iniziale da sistema

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setDarkMode]);

  return { isDarkMode, setDarkMode };
}
