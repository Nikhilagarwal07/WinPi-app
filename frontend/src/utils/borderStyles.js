// frontend/src/utils/borderStyles.js

// Central place to manage all border styles
// Only classes defined here will be used by Tailwind (safe for production builds)

export const borderStyles = {
  border_default: "p-1 bg-gray-600", // fallback / default frame
  border_gold: "p-1 bg-gradient-to-br from-yellow-300 to-amber-500",
  border_cyber: "p-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]",
  border_cosmic: "p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
};

// Helper to get style by itemId, with fallback
export const getBorderStyle = (itemId) => {
  return borderStyles[itemId] || borderStyles.border_default;
};
