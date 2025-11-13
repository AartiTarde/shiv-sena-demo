import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary brand colors
        carrot: {
          DEFAULT: "#E67E22",
          50: "#FFF5E6",
          100: "#FFE5CC",
          200: "#FFE5CC", // Selected/highlighted row
          300: "#FFECD6", // Top header bar
          400: "#E67E22", // Carrot orange
          500: "#E67E22",
          600: "#D35400", // Burnt orange (hover/dark accent)
          700: "#D35400",
          800: "#A04000",
          900: "#7D2F00",
        },
        burnt: {
          DEFAULT: "#D35400",
          50: "#FFF5E6",
          100: "#FFE5CC",
          200: "#FFE5CC",
          300: "#FFECD6",
          400: "#E67E22",
          500: "#D35400",
          600: "#A04000",
          700: "#7D2F00",
          800: "#5A2E00",
          900: "#3D1F00",
        },
        peach: {
          50: "#FFF8F0", // Main background
          100: "#FFECD6", // Top header bar
          200: "#FFE5CC", // Selected/highlighted row
          300: "#FFD9B3",
          400: "#FFCC99",
          500: "#FFB366",
        },
        slate: {
          DEFAULT: "#2C3E50", // Dark gray-blue (main text, icons)
          50: "#F8F9FA",
          100: "#E9ECEF",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#ADB5BD",
          500: "#7F8C8D", // Medium gray (category labels)
          600: "#6C757D",
          700: "#495057",
          800: "#343A40",
          900: "#2C3E50",
        },
        border: {
          DEFAULT: "#E0E0E0",
          light: "#E0E0E0",
          medium: "#BDBDBD",
          dark: "#9E9E9E",
        },
      },
    },
  },
  plugins: [],
};
export default config;

