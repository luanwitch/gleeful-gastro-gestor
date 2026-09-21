/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#faf8f3",
        cream: "#ede3d4",
        mist: "#d8cdbd",
        earth: "#39372f",
        accent: "#8a542f",
        primary: "#3f4824",
        "hover-soft": "#777752",
        sand: "#ede3d4",
        olive: "#3f4824",
        "olive-deep": "#3f4824",
        "neutral-accent": "#a38e79",
        border: "#a38e79",
        input: "#d8cdbd",
        ring: "#3f4824",
      },
    },
  },
  plugins: [],
};
