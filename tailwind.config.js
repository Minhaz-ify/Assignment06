/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0c0d0e",
        panel: "#151719",
        raised: "#1d2023",
        line: "#2b2f33",
        accent: "#ccff00",
        muted: "#9aa1a8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
