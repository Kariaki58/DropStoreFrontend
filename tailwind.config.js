// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-teal': '#004085', // Dark Blue for sidebar and headers
        'light-teal': '#5BC0DE', // Light Blue for secondary buttons and accents
        'light-secondary-bg': '#F8F9FA', // Light Grey for cards and backgrounds
        'dark-gray': '#343A40', // Dark Grey for text and icons
        'black': '#000000', // Black for text
        'white': '#FFFFFF', // White for text and backgrounds
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "light",
    base: false,
    styled: false,
    utils: false,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
}
