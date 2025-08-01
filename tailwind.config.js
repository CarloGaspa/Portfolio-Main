/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#071D2B", //Colore principale base
        "primary-light": "#123446", //Variante più chiara
        "primary-dark": "#020E16", //Variante più scura
        background: "#0A1F2E", //Sfondo più soft
        accent: "#00C2FF", //Colore di accento (opz.)
      },
    },
  },
  plugins: [],
};
