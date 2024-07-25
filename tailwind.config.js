/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateRows: {
        row: "repeat(3 , 100px)"
      },
      gridTemplateColumns: {
         columns: "repeat(3 , 100px)"
      },
      fontFamily:{
        sourceCodePro: ["Source Code Pro" , "cursive"]
      },
      screens: {
        xs: "100px",
      }
    },
  },
  plugins: [],
}