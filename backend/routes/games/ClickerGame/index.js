// File: backend/routes/clicker/index.js

import express from "express";
import { authMiddleware } from "../../../utils/authMiddleware.js";
import User from "../../../models/User.js";
import GameScore from "../../../models/GameScore.js";

const router = express.Router();

router.post("/submit-score", authMiddleware, async (req, res) => {
  const { score } = req.body;
  const gameId = "pi-clicker";

  if (typeof score !== "number" || score < 0) {
    return res.status(400).json({ message: "Invalid score." });
  }

  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.xp += score;
    await user.save();

    await GameScore.create({ user: user._id, game: gameId, score: score });

    res.json({ success: true, message: "Score submitted!", newXp: user.xp });
  } catch (err) {
    console.error(`Error submitting score for ${gameId}:`, err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
