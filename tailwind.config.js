/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ff5722",
          light: "#ff8a65",
          dark: "#e64a19",
        },
      },
    },
  },
  plugins: [],
};
