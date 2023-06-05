/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/index.html", "./html/workout-page.html", "./js/app.js", "./js/navmobile.js"],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["poppins", "sans-serif"],
      inknut: ["inknut antiqua", "sans-serif"]
    },
  },
  plugins: [],
}

