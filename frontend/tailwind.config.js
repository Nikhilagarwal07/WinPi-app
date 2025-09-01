// File: frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Digital Frontier Theme Palette
        'brand-dark': '#0D0C1D',      // Very Dark Blue/Purple
        'brand-card': '#161A30',      // Slightly lighter card background
        'brand-primary': '#B931FC',   // Vibrant Magenta/Purple
        'brand-secondary': '#22D3EE', // Bright Cyan
        'brand-accent': '#FBBF24',    // Bright Yellow/Gold for highlights
        'brand-text': '#F1F5F9',      // Main text color (off-white)
        'brand-subtext': '#94A3B8',   // Subtler text color (slate)
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};