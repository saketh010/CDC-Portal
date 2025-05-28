/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        important: "#2596be", // dark blue
        light: "#abdbe3" // light blue
      },
    },
  },
  plugins: [require('daisyui')],
}

