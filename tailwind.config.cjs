const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    fill: (theme) => ({
      current: "currentColor",
      white: theme("colors.white"),
    }),
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      gray: colors.slate,
      blue: {
        50: "#b3c0ff",
        100: "#8ea1ff",
        200: "#7b91ff",
        300: "#6881ff",
        400: "#5572ff",
        500: "#4262ff",
        600: "#3b58e6",
        700: "#2e45b3",
        800: "#213180",
        900: "#141d4c",
      },
    },
    extend: {},
  },
  plugins: [],
};
