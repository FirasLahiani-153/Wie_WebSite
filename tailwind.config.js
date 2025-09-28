/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        righteous: ['Righteous', 'cursive'],
        ropa: ['Ropa Sans', 'sans-serif'],

      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
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