import React from "react";

// const QuickActionButton = ({ label, icon, color }) => (
//  <div className="flex flex-col items-center space-y-2">
//    <button
//      className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white text-3xl
//                  shadow-lg border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
//    >
//      {icon}
//    </button>
//    <span className="text-xs text-brand-subtext font-medium pt-1">{label}</span>
//  </div>
// );

const QuickActionButton = ({ label, icon, gradient, borderColor }) => (
  <div className="flex flex-col items-center space-y-2">
    <button
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg overflow-hidden backdrop-blur-lg"
      style={{
        background: gradient,
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 16px 2px ${borderColor}80, 0 0 40px 4px ${borderColor}40`,
      }}
    >
      {icon}
    </button>
    <span className="text-xs text-brand-subtext font-medium pt-1">{label}</span>
  </div>
);

export default QuickActionButton;