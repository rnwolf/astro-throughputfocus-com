const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: [
    "./public/**/*.html",
    "./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}",
  ],
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    backgroundImage: (theme) => ({
      "hero-pattern": "url('/wave.svg')",
    }),
    fill: (theme) => ({
      current: "currentColor",
      white: theme("colors.white"),
    }),
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      slate: colors.slate,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
