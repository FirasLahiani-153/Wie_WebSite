/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif' ],
      },
      colors: {
        primary: '#742F8A',
        secondary: '#E3E3E3',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}