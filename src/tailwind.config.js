/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5E6AD2",
          light: "#8B5CF6",
          dark: "#4C51BF",
        },
        accent: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        pending: "#71717A",
        dark: {
          bg: "#0A0B0F",
          elevated: "#16171D",
          hover: "#1F2028",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          tertiary: "#71717A",
        },
        border: {
          default: "rgba(255, 255, 255, 0.1)",
          strong: "rgba(255, 255, 255, 0.2)",
          subtle: "rgba(255, 255, 255, 0.05)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.3)",
        primary: "0 8px 24px rgba(94, 106, 210, 0.3)",
      },
      backdropBlur: {
        glass: "16px",
      },
    },
  },
  plugins: [],
};
