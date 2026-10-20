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
        background: "#F2F6FC",
        surface: {
          DEFAULT: "#F8FAFE",
          card: "#F8FAFE",
          inset: "#EBF1FA",
        },
        brand: {
          50: "#F2F6FC",
          100: "#E4EEFC",
          200: "#C6D8F8",
          300: "#9DBAF0",
          400: "#729CE5",
          500: "#4C7EDB",
          600: "#346BC4",
          700: "#2457A7",
          800: "#1C4477",
          900: "#17365D",
          950: "#0D2038",
        },
        text: {
          main: "#1D2C43",
          muted: "#5F738E",
          subtle: "#8A9BA8",
        },
        border: {
          subtle: "#D9E4F2",
          active: "#B8D0F4",
        },
        state: {
          success: "#1F7A65",
          warning: "#996200",
          danger: "#B42332",
        },
      },
      boxShadow: {
        "neu-raised": "8px 8px 18px rgba(180, 196, 218, 0.45), -8px -8px 18px rgba(255, 255, 255, 0.85)",
        "neu-raised-sm": "4px 4px 10px rgba(180, 196, 218, 0.35), -4px -4px 10px rgba(255, 255, 255, 0.8)",
        "neu-raised-lg": "12px 12px 24px rgba(180, 196, 218, 0.45), -12px -12px 24px rgba(255, 255, 255, 0.9)",
        "neu-inset": "inset 4px 4px 8px rgba(180, 196, 218, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.85)",
        "neu-inset-sm": "inset 2px 2px 5px rgba(180, 196, 218, 0.4), inset -2px -2px 5px rgba(255, 255, 255, 0.85)",
        "neu-pressed": "inset 3px 3px 6px rgba(180, 196, 218, 0.5), inset -3px -3px 6px rgba(255, 255, 255, 0.9)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
