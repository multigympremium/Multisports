/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#cfcfcf",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        title: "var(--title-color)",
        paragraph: "var(--paragraph-color)",
        border: "var(--border-color)",
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
};
