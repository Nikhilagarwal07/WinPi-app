// frontend/src/utils/borderStyles.js

// Central place to manage all border styles
// Only classes defined here will be used by Tailwind (safe for production builds)

import defaultFrame from "../assets/frames/L1-removebg-preview.png";
import frameL1 from "../assets/frames/L1-removebg-preview.png";
import frameL2 from "../assets/frames/L2-removebg-preview.png";
import frameL3 from "../assets/frames/L3-removebg-preview.png";
import frameL4 from "../assets/frames/L4-removebg-preview.png";
import frameL5 from "../assets/frames/L5-removebg-preview.png";
import frameL6 from "../assets/frames/L6-removebg-preview.png";
import frameL7 from "../assets/frames/L7-removebg-preview.png";

import defaultMask from "../assets/frames/L1-mask.png";
import maskL1 from "../assets/frames/L1-mask.png";
import maskL2 from "../assets/frames/L2-mask.png";
import maskL3 from "../assets/frames/L3-mask.png";
import maskL4 from "../assets/frames/L4-mask.png";
import maskL5 from "../assets/frames/L5-mask.png";
import maskL6 from "../assets/frames/L6-mask.png";
import maskL7 from "../assets/frames/L7-mask.png";

// 2. Create a map that links the item ID from the database to the correct imported image
const frameImageMap = {
  border_default: defaultFrame,
  frame_l1: frameL1,
  frame_l2: frameL2,
  frame_l3: frameL3,
  frame_l4: frameL4,
  frame_l5: frameL5,
  frame_l6: frameL6,
  frame_l7: frameL7,
};

export const frameConfig = {
  border_default: {
    frameUrl: defaultFrame,
    maskUrl: defaultMask, // no mask for default
  },
  frame_l1: { frameUrl: frameL1, maskUrl: maskL1 },
  frame_l2: { frameUrl: frameL2, maskUrl: maskL2 },
  frame_l3: { frameUrl: frameL3, maskUrl: maskL3 },
  frame_l4: { frameUrl: frameL4, maskUrl: maskL4 },
  frame_l5: { frameUrl: frameL5, maskUrl: maskL5 },
  frame_l6: { frameUrl: frameL6, maskUrl: maskL6 },
  frame_l7: { frameUrl: frameL7, maskUrl: maskL7 },
};

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

export const getFrameImage = (itemId) => {
  return frameImageMap[itemId] || defaultFrame;
};

export const getFrame = (itemId) =>
  frameConfig[itemId] || frameConfig.border_default;
