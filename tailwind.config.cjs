/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#0035ad",
        accent: "#2ea8ef",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
