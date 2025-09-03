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
        // High-Contrast "Pro Gamer" Palette
        'brand-dark': '#0D0C1D',      // Very Dark Blue/Purple (Background)
        'brand-card': '#1E293B',      // Dark Slate (Card Background - NEW, HIGHER CONTRAST)
        'brand-primary': '#B931FC',   // Vibrant Magenta/Purple
        'brand-secondary': '#22D3EE', // Bright Cyan
        'brand-accent': '#FBBF24',    // Bright Yellow/Gold
        'brand-text': '#F1F5F9',      // Main text color
        'brand-subtext': '#94A3B8',   // Subtler text color
        
        // Card Glow Colors (From your reference images)
        'glow-purple-from': '#6366F1',
        'glow-purple-to': '#8B5CF6',
        'glow-cyan-from': '#22D3EE',
        'glow-cyan-to': '#0E7490',
        'glow-green-from': '#34D399',
        'glow-green-to': '#10B981',
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};