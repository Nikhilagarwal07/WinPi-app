// File: backend/models/GameScore.js

import mongoose from "mongoose";

const gameScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameId: {
    type: String,
    required: true, // e.g., 'pi-clicker'
  },
  xp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30d", // Automatically delete after 30 days
  },
});

const GameScore = mongoose.model("GameScore", gameScoreSchema);

export default GameScore;
