// File: backend/routes/games/ClickerGame/index.js

import express from 'express';
import { authMiddleware } from '../../../utils/authMiddleware.js';
import User from '../../../models/User.js';
import GameScore from '../../../models/GameScore.js';
import UserGameData from '../../../models/UserGameData.js';

const router = express.Router();

router.post('/submit-score', authMiddleware, async (req, res) => {
  // Now accepts both gameScore and xpEarned
  const { gameScore, xpEarned } = req.body;
  const gameId = 'pi-clicker';

  if (typeof gameScore !== 'number' || gameScore < 0 || typeof xpEarned !== 'number' || xpEarned < 0) {
    return res.status(400).json({ message: 'Invalid score or XP.' });
  }

  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // 1. Add the XP earned to the user's total XP
    user.xp += xpEarned;
    await user.save();

    // 2. Log the XP earned for the weekly leaderboard
    await GameScore.create({ user: user._id, game: gameId, score: xpEarned });

    // 3. Update the high score with the gameScore
    await UserGameData.findOneAndUpdate(
      { user: user._id, gameId: gameId },
      { $max: { highScore: gameScore } },
      { upsert: true }
    );

    res.json({ success: true, message: 'Score submitted!', newXp: user.xp });
  } catch (err) {
    console.error(`Error submitting score for ${gameId}:`, err);
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;