/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        jaffa: {
          navy: '#0D1B2A',
          navyLight: '#1A2A3A',
          gold: '#C8A96E',
          goldLight: '#E8D5A3',
          parchment: '#F0E6D3',
          red: '#8B2500',
          green: '#25D366',
        },
      },
      fontFamily: {
        hebrew: ['Rubik', 'Assistant', 'sans-serif'],
        heading: ['"Frank Ruhl Libre"', 'serif'],
      },
    },
  },
  plugins: [],
}
