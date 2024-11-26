/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./counter.js",
    "./main.js",
    "*.{js,jsx}",
    "./**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}