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
        background: "#E3EEFF",
        surface: {
          DEFAULT: "#F7FAFF",
          card: "#F7FAFF",
          inset: "#EBF3FF",
        },
        brand: {
          50: "#F7FAFF",
          100: "#E3EEFF",
          200: "#CCE1FF",
          300: "#9EC8FF",
          400: "#6FB1FF",
          500: "#4B8FEA",
          600: "#3374D4",
          700: "#2457A7",
          800: "#1C4477",
          900: "#17365D",
          950: "#0E233F",
        },
        text: {
          main: "#17365D",
          muted: "#4B6282",
          subtle: "#7A90AE",
        },
        border: {
          subtle: "#D0E1F9",
          active: "#A8CBFA",
        },
        state: {
          success: "#1F7A65",
          warning: "#996200",
          danger: "#B42332",
        },
      },
      boxShadow: {
        "neu-raised": "8px 8px 18px rgba(164, 188, 224, 0.55), -8px -8px 18px rgba(255, 255, 255, 0.95)",
        "neu-raised-sm": "4px 4px 10px rgba(164, 188, 224, 0.42), -4px -4px 10px rgba(255, 255, 255, 0.9)",
        "neu-raised-lg": "12px 12px 24px rgba(164, 188, 224, 0.55), -12px -12px 24px rgba(255, 255, 255, 0.98)",
        "neu-inset": "inset 4px 4px 8px rgba(164, 188, 224, 0.45), inset -4px -4px 8px rgba(255, 255, 255, 0.9)",
        "neu-inset-sm": "inset 2px 2px 5px rgba(164, 188, 224, 0.45), inset -2px -2px 5px rgba(255, 255, 255, 0.9)",
        "neu-pressed": "inset 3px 3px 6px rgba(164, 188, 224, 0.58), inset -3px -3px 6px rgba(255, 255, 255, 0.95)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: [
          "var(--font-source-sans)",
          '"Source Sans 3"',
          '"Source Sans Pro"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "var(--font-lora)",
          "Lora",
          "Georgia",
          "serif",
        ],
        accent: [
          "var(--font-lora)",
          "Lora",
          "Georgia",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
