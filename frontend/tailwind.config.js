// File: frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // High-Contrast "Pro Gamer" Palette
        "brand-dark": "#0D0C1D", // Very Dark Blue/Purple (Background)
        "brand-card": "#1E293B", // Dark Slate (Card Background - NEW, HIGHER CONTRAST)
        "brand-primary": "#B931FC", // Vibrant Magenta/Purple
        "brand-secondary": "#22D3EE", // Bright Cyan
        "brand-accent": "#FBBF24", // Bright Yellow/Gold
        "brand-text": "#F1F5F9", // Main text color
        "brand-subtext": "#94A3B8", // Subtler text color

        // Card Glow Colors (From your reference images)
        "glow-purple-from": "#6366F1",
        "glow-purple-to": "#8B5CF6",
        "glow-cyan-from": "#22D3EE",
        "glow-cyan-to": "#0E7490",
        "glow-green-from": "#34D399",
        "glow-green-to": "#10B981",

        //avatar colours
        "avatar-blue": "#1E3A8A",   // Deep Royal Blue
        "avatar-green": "#166534",  // Emerald Green
        "avatar-red": "#991B1B",    // Crimson Red
        "avatar-black": "#111827",  // Charcoal Black
        "avatar-gradient-start": "#181819ff", // For gradient
        "avatar-gradient-end": "#b005bcff",   // Royal Purple
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-100%) rotateZ(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(100vh) rotateZ(720deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        "pop-in": "pop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "confetti-fall": "confetti-fall 3s linear infinite",
        "pop-in-delayed":
          "pop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s backwards",
      },
    },
  },
  plugins: [],
};
