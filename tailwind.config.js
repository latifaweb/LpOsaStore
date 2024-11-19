/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Tambahkan font Montserrat
        sans: ['"SF Pro Display"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}