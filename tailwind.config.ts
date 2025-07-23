import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0967d2', // <- THIS LINE is important for using just "primary"
          50: '#e6f7ff',
          100: '#bae3ff',
          200: '#7cc4fa',
          300: '#47a3f3',
          400: '#2186eb',
          500: '#0967d2', 
          600: '#0552b5',
          700: '#03449e',
          800: '#01337d',
          900: '#002159',
        },
        secondary: {
          DEFAULT: '#6e46e3', // <- THIS LINE is important for using just "secondary"
          50: '#f2f0ff',
          100: '#e4e0ff',
          200: '#c7bfff',
          300: '#a89eff',
          400: '#897eff',
          500: '#7b5dff', 
          600: '#6e47ff',
          700: '#5e31ff',
          800: '#4f1aff',
          900: '#3802ff',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
