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
  {
    itemId: 'frame_l1',
    name: 'Level 1 Frame',
    description: 'A stylish, foundational frame.',
    cost: 100,
    type: 'border',
  },
  {
    itemId: 'frame_l2',
    name: 'Level 2 Frame',
    description: 'An upgraded frame with more flair.',
    cost: 250,
    type: 'border',
  },
  {
    itemId: 'frame_l3',
    name: 'Level 3 Frame',
    description: 'A frame that shows dedication.',
    cost: 500,
    type: 'border',
  },
  {
    itemId: 'frame_l4',
    name: 'Level 4 Frame',
    description: 'An intricate and impressive design.',
    cost: 1000,
    type: 'border',
  },
  {
    itemId: 'frame_l5',
    name: 'Level 5 Frame',
    description: 'A frame reserved for elite players.',
    cost: 2000,
    type: 'border',
  },
  {
    itemId: 'frame_l6',
    name: 'Level 6 Frame',
    description: 'A legendary frame of great power.',
    cost: 4000,
    type: 'border',
  },
  {
    itemId: 'frame_l7',
    name: 'Level 7 Frame',
    description: 'The ultimate frame, a symbol of mastery.',
    cost: 8000,
    type: 'border',
  },
];
