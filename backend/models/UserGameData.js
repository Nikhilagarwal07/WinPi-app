// File: backend/models/UserGameData.js

import mongoose from "mongoose";

const userGameDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameId: {
    type: String,
    required: true, // e.g., 'pi-clicker', 'pi-quiz'
  },
  highScore: {
    type: Number,
    default: 0,
  },
});

// This ensures a user can only have one document per gameId, preventing duplicates.
userGameDataSchema.index({ user: 1, gameId: 1 }, { unique: true });

const UserGameData = mongoose.model("UserGameData", userGameDataSchema);

export default UserGameData;
