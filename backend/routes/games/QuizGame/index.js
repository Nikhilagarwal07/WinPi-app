// File: backend/routes/quiz/index.js

import express from "express";
import { authMiddleware } from "../../../utils/authMiddleware.js";
import User from "../../../models/User.js";
import GameScore from "../../../models/GameScore.js";
import { questions } from "./questions.js";

const router = express.Router();

// Route to get questions
router.get("/questions", (req, res) => {
  try {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const questionsForGame = shuffledQuestions.slice(0, 5).map((q) => ({
      ...q,
      answers: [...q.answers].sort(() => Math.random() - 0.5),
    }));
    res.json(questionsForGame);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

// Route to submit score for the quiz
router.post("/submit-score", authMiddleware, async (req, res) => {
  const { score } = req.body;
  const gameId = "pi-quiz";

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
