import React from "react";

const GlassCard = ({ children, gradient, borderColor, height }) => (
  <div
    className="rounded-2xl p-4 text-center overflow-hidden backdrop-blur-lg"
    style={{
      background: gradient,
      border: `1px solid ${borderColor}`,
      boxShadow: `0 0 16px 2px ${borderColor}80, 0 0 40px 4px ${borderColor}40`,
      height: height || "auto",
    }}
  >
    {children}
  </div>
);

export default GlassCard;