const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/admin/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      flexWrap: ["hover", "focus"],
      minHeight: ["hover", "focus"],
      height: ["hover", "focus"],
      padding: ["hover", "focus"],
      textAlign: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      indigo: colors.indigo,
      blue: colors.blue,
    },
    extend: {
      colors: {
        green: colors.emerald,
      },
    },
  },
};
