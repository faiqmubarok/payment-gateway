import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins' : ['Poppins', 'sans-serif'],
        'inter' : ['Inter', 'sans-serif']
      },
      colors: {
        'primary' : '#308be6',
        'secondary': '#101720',
        'orangePrimary' : '#e26b13',
        'orangeSecondary' : '#b9580e',
        'greenPrimary' : '#16423C',
        'greenSecondary' : '#1a4b45',
        'black': '#1C2434',
      },
      
    },
  },
  plugins: [flowbitePlugin], 
};
