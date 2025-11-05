import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./content/**/*.{md,mdx}", "./docs/**/*.{md,mdx}", "./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"]
      },
      colors: {
        brand: {
          DEFAULT: "#2563EB",
          dark: "#1F2937",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444"
        }
      }
    }
  },
  plugins: [animate]
};

export default config;
