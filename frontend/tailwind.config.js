const withTailwindCSS = require('tailwindcss/cjs');

module.exports = withTailwindCSS({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#2d5a8c',
      },
    },
  },
  plugins: [],
});
