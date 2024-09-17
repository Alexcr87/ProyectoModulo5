import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: "var(--primary-color)",
        secundaryColor: "var(--secundary-color)",
        tertiaryColor: "var(--tertiary-color)",
        cuartiaryColor: "var(--cuartiary-color)"
      },
    },
  },
  plugins: [],
};
export default config;
