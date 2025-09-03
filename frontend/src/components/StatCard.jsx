import React from "react";

// const StatCard = ({ label, value, subValue, icon, gradient }) => (
//  <div
//    className={`relative p-4 rounded-2xl flex-1 shadow-lg border overflow-hidden border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-lg`}
//    style={{
//      background: gradient
//    }}
//  >
//    <div className="flex items-center justify-between text-white/80 text-sm">
//      <span>{label}</span>
//      {icon}
//    </div>
//    <p className="text-2xl font-bold text-white mt-2">{value}</p>
//    {subValue && <p className="text-xs text-green-300 font-semibold">{subValue}</p>}
//  </div>
// );

const StatCard = ({ label, value, subValue, icon, gradient, borderColor }) => (
  <div
    className="relative p-4 rounded-2xl flex-1 overflow-hidden backdrop-blur-lg"
    style={{
      background: gradient,
      border: `1px solid ${borderColor}`,
      boxShadow: `0 0 16px 2px ${borderColor}80, 0 0 40px 4px ${borderColor}40`,
    }}
  >
    <div className="flex items-center justify-between text-white/80 text-sm">
      <span>{label}</span>
      {icon}
    </div>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
    {subValue && <p className="text-xs text-green-300 font-semibold">{subValue}</p>}
  </div>
);

export default StatCard;