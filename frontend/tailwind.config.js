/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#08090C',
          800: '#0D0F17',
          700: '#151824',
          600: '#1C2133',
        },
        cyan: {
          glow: '#00F0FF',
        }
      }
    },
  },
  plugins: [],
}
