import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import useStore from "../../store.js"; // usa lo stesso nome per chiarezza
import { cn } from "@/lib/utils"; // Assicurati che questa funzione esista

export function ThemeToggle({ className, ...props }) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className={cn("h-9 w-9 relative", className)}
      {...props}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
