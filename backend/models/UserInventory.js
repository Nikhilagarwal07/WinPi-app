// File: backend/models/UserInventory.js

import mongoose from 'mongoose';

const userInventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: String, // e.g., 'border_gold', 'badge_winner'
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user can only own one of each item
userInventorySchema.index({ user: 1, itemId: 1 }, { unique: true });

const UserInventory = mongoose.model('UserInventory', userInventorySchema);

export default UserInventory;