/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluebg: "#E7F6FF",
        greenbg: "#EAFFFB",
        purplebg: "#EEE5FF",
        orangebg: "#FFE3D3",
        pinkbg: "#FFE8EC",
        yellowbg: "#FFFACA",
        darkbluebg: "#5FD1FA",
        darkgreenbg: "#E6EE99",
        darkpurplebg: "#B096F6",
        darkorangebg: "#EFA07A",
        darkpinkbg: "#F4A0AF",
        darkyellowbg: "#F7CB7F",
        text: "#121212",
        secondarytext:"#383838",
      },
    },
  },
  plugins: [],
}