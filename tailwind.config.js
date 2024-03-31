/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myrtle: "#297373",
        twitterblue: "#1D9BF0",
        grayedout: "#6E7377",
        offwhite: "#E7E9EA",
        buttonwhite: "#EFF3F4",
        outline: "#6E7377",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
