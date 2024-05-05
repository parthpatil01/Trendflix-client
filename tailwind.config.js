/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#10141E',
        'secondary': '#161D2F',
        'tertiary': '#5A698F',
        'custom-red': '#FC4747',
        'white': '#FFFFFF'
      },
    },
  },
  plugins: [],
}