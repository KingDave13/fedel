/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050759",
        secondary: "#FED33C",
        primaryalt: "#DAD9D9",
        mainalt: "#7D7D7D",
        mainRed: "#E30613",
        main: "#434344",
        main2: "#F3F3F3",
        main3: "#B5B5B5",
        green: "#4CA735",
        greenBright: "#27E63A",
        greenDeep: "#11AD21",
        brightRed: "#EA4335"
      },
      fontFamily: {
        'encode-sans': ["Encode Sans", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};