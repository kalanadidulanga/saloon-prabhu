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
        "nav-color": "#3DA1D240",
        "color-1": "#EBEBEB",
        "color-2": "#B74F6F",
        "color-3": "#3DA1D2",
        "color-4": "#FCA311",
        "color-5": "#28262C",
        "color-6": "#E9D415",
        "color-7": "#F6ECD799",
        "text-color": "#525252",
        "my-blue": "#4880FF",
        "bg-color": "#222227",
        "Color": "#F6ECD7",
        "primary-bg": "#EBEBEB"
      },
    },
    backgroundImage: {
      btnbg: "url('/assets/btnbg.png')",
      customerbg: "url('/assets/customerbg.png')",
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
