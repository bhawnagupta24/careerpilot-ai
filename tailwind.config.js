/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#08090D",
          900: "#0B0D12",
          850: "#0F1117",
          800: "#12141B",
          700: "#1A1D26",
          600: "#252834",
          500: "#363B49",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          soft: "rgba(255,255,255,0.05)",
          strong: "rgba(255,255,255,0.14)",
        },
        brand: {
          blue: "#2563EB",
          indigo: "#4F46E5",
          cyan: "#06B6D4",
        },
        ink: {
          50: "#F5F6F8",
          200: "#C7CBD4",
          400: "#8B90A0",
          500: "#6C7180",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(115deg, #2563EB 0%, #4F46E5 50%, #06B6D4 100%)",
        "brand-gradient-soft": "linear-gradient(115deg, rgba(37,99,235,0.15) 0%, rgba(79,70,229,0.15) 50%, rgba(6,182,212,0.15) 100%)",
        "radial-fade": "radial-gradient(circle at top, rgba(79,70,229,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(37,99,235,0.15)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(3%,-4%) scale(1.05)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        aurora: "aurora 12s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};
