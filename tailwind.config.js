/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')

module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'persian-red': {
          '50': '#fdf4f3',
          '100': '#fce5e4',
          '200': '#fad0ce',
          '300': '#f6afab',
          '400': '#ef807a',
          '500': '#e35850',
          '600': '#c7362e',
          '700': '#ae2e27',
          '800': '#902a24',
          '900': '#782824',
          '950': '#41110e',
        },
      },
    },
  },
  plugins: [],
});

