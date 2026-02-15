/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#1F3A2F",
          800: "#274738",
          700: "#2F5B46",
          600: "#3A6E56",
          300: "#9EC2B1",
          100: "#E6EFEA",
        },
        paper: {
          100: "#F6F0E7",
          50: "#FFF9F1",
        },
        ink: {
          900: "#0F172A",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
          400: "#94A3B8",
        },
        line: "#E7DCCB",
        accent: {
          800: "#9A3412",
          700: "#EA580C",
          600: "#F97316",
          100: "#FFEDD5",
          50:  "#FFF7ED",
        },

        // Dark-mode palette (avoid pure black)
        night: {
          950: "#0B1220", // app background
          900: "#0F1A2E", // page section
          850: "#111F36", // hover background
          800: "#14223B", // card
          700: "#1B2B47", // raised card
          line: "#22304A", // borders
        },
      },
      boxShadow: { soft: "0 10px 30px rgba(15, 23, 42, 0.08)" },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
