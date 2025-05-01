/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#00D093',
        'secondary-purple': '#7B61FF',
        'dark-bg': '#1A1A1A',
        'card-bg': '#1E1E1E',
        'text-secondary': '#B0B0B0',
        'disabled': '#4A4A4A',
        'heat': '#FF6B00',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
