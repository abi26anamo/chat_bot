/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-md': '770px',
        'custom-lg': '920px'
      },
    },
  },
  plugins: [],
}

