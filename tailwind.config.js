/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0056A0",
        secondary: "#004080",
        accent: "#FFD700",
        background: "#F4F4F4",
        cardBackground: "#FFFFFF",
        text: "#333333",
        mutedText: "#7D7D7D",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        title: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0056A0",
          secondary: "#004080",
          accent: "#FFD700",
          neutral: "#333333",
          "base-100": "#F4F4F4",
          "base-content": "#333333",
        },
        dark: {
          primary: "#FFD700",
          secondary: "#004080",
          accent: "#0056A0",
          neutral: "#FFFFFF",
          "base-100": "#333333",
          "base-content": "#F4F4F4",
        },
      },
    ],
  },
};
