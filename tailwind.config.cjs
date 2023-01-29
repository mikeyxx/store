/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BFBFBF",
        card: "#ffffff",
        wallpaper: "#F2F2F2",
        secondary: "#012030",
        cartColor: "#F23030",
      },
    },
  },
  plugins: [],
};
