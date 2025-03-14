//import { dark, light } from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ".custom-chat-bg": {
            "background-color": "#fff",
            "background-image": "radial-gradient(#d7d7d7 1px,transparent 1px)",
            "background-size": "16px 16px",
          },
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          ".custom-chat-bg": {
            "background-color": "#1d232a",
            "background-image": "radial-gradient(#2b3440 1px,transparent 1px)",
            "background-size": "16px 16px",
          },
        },
      },
    ],
    base: true,
    utils: true,
  },
};
