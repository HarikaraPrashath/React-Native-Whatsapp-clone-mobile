/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: include app/ so Tailwind sees your NativeWind classNames
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
