
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./public/index.html" // ensures Tailwind scans your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",   // Indigo
        secondary: "#0ea5e9", // Sky blue
        accent: "#22c55e",    // Green
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

