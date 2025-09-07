// File: backend/routes/storeItems.js

export const storeItems = [
  {
    itemId: "border_gold",
    name: "Golden Frame",
    description: "A prestigious frame forged in gold.",
    cost: 500,
    type: "border",
    // This is now a more complex style for a better visual effect
    style: "p-1 bg-gradient-to-br from-yellow-300 to-amber-500",
    // This is the URL for the image preview
    imageUrl: "https://placehold.co/128x128/FBBF24/0D0C1D?text=Gold",
  },
  {
    itemId: "border_cyber",
    name: "Cyber Frame",
    description: "A futuristic, glowing cyan border.",
    cost: 750,
    type: "border",
    style: "p-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]",
    imageUrl: "https://placehold.co/128x128/22D3EE/0D0C1D?text=Cyber",
  },
  {
    itemId: "border_cosmic",
    name: "Cosmic Frame",
    description: "A frame imbued with the power of the cosmos.",
    cost: 1200,
    type: "border",
    style: "p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    imageUrl: "https://placehold.co/128x128/8B5CF6/FFFFFF?text=Cosmic",
  },
];
