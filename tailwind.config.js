/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        red:{
          500: '#b00d01'
        },
        yellow:{
          500: '#ffcc00'
        }
      }
    },
  },
  plugins: [],
}

