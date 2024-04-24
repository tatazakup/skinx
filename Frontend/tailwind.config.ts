/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  safelist: [],
  theme: {
    extend: {
      spacing: {
        mobile: "375px",
        tablet: "700px",
      },
      width: {
        mobile: "375px",
      },
      height: {
        inherit: "inherit",
        "4.5": "1.125rem",
        "15": "3.75rem",
        "30vh": "30vh",
        "70vh": "70vh",
        "100vh": "100vh",
      },
      colors: {
        customGrey: {
          100: "EBEBEB",
          200: "F3F3F3",
          300: "#999999",
          400: "#6B7280",
          500: "#4D4D4D",
        },
      },
    },
  },
  plugins: [],
  // prefix: "tw-",
};
