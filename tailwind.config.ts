import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#8576A6", // from your color palette
        light: "#CBBEFA",   // from your color palette
        dark: "#5D5773",    // from your color palette
        secondary: {
          DEFAULT: "#D981A3",  // from your color palette
          light: "#FAE0D7",    // from your color palette
          dark: "#734D3F",     // from your color palette
        },
      },
    },
  },
  plugins: [],
};
export default config;
