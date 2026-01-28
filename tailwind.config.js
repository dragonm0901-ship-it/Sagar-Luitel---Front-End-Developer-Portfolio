/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        primary: "#ffffff",
        lime: "#ccff00", // The signature Lime Green
        secondary: "#888888",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming we want a clean font, defaults to system otherwise
      }
    },
  },
  plugins: [],
}
