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
        'black': '#1C2434',
      },
      
    },
  },
  plugins: [flowbitePlugin], 
};
