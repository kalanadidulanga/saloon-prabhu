/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        judson: ['"Judson"', "serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      colors: {
        gray: {
          100: "#E0E0E0", // Light gray
        },
        rose: {
          500: "#C46E79", // Rose
        },
        blue: {
          500: "#3091D5", // Blue
        },
        orange: {
          500: "#F1A324", // Orange
        },
        black: {
          900: "#252427", // Black
        },
        yellow: {
          500: "#F5DD2A", // Yellow
        },
        beige: {
          500: "#BDB6A5", // Beige
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
