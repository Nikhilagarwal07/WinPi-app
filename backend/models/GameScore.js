// File: backend/models/GameScore.js

import mongoose from 'mongoose';

const gameScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: String,
    required: true, // e.g., 'pi-clicker'
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GameScore = mongoose.model('GameScore', gameScoreSchema);

export default GameScore;