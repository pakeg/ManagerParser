/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        fscreen: "calc(100vh - 56.8px)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".rotate-z-45": {
          transform: "rotateZ(45deg)",
        },
        "input[type='number']": {
          "&": {
            "-moz-appearance": "textfield !important",
          },
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
      });
    }),
  ],
};
