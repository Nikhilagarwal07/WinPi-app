// File: backend/routes/games/QuizGame/index.js

import express from "express";
import { authMiddleware } from "../../../utils/authMiddleware.js";
import User from "../../../models/User.js";
import GameScore from "../../../models/GameScore.js";
import UserGameData from "../../../models/UserGameData.js";
import { questions } from "./questions.js";

const router = express.Router();
const HINT_COST = 10;

// ... ('/questions' and '/use-hint' routes are unchanged)
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

router.post("/use-hint", authMiddleware, async (req, res) => {
  const { currentAnswers } = req.body;
  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.gems < HINT_COST)
      return res.status(400).json({ message: "Not enough gems!" });

    user.gems -= HINT_COST;
    await user.save();
    const incorrectAnswerToRemove = currentAnswers.find(
      (answer) => !answer.isCorrect
    );
    res.json({
      success: true,
      hint: incorrectAnswerToRemove.answerText,
      newGemBalance: user.gems,
    });
  } catch (err) {
    console.error(`Error using hint:`, err);
    res.status(500).json({ message: "Server error while using hint." });
  }
});

router.post("/submit-score", authMiddleware, async (req, res) => {
  // Now accepts both gameScore and xpEarned
  const { gameScore, xpEarned } = req.body;
  const gameId = "pi-quiz";

  if (
    typeof gameScore !== "number" ||
    gameScore < 0 ||
    typeof xpEarned !== "number" ||
    xpEarned < 0
  ) {
    return res.status(400).json({ message: "Invalid score or XP." });
  }

  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) return res.status(404).json({ message: "User not found." });

    // 1. Add the XP earned to the user's total XP
    user.xp += xpEarned;
    await user.save();

    // 2. Log the XP earned for the weekly leaderboard
    await GameScore.create({ user: user._id, gameId: gameId, xp: xpEarned });

    // 3. Update the high score with the gameScore
    await UserGameData.findOneAndUpdate(
      { user: user._id, gameId: gameId },
      { $max: { highScore: gameScore } },
      { upsert: true }
    );

    res.json({ success: true, message: "Score submitted!", newXp: user.xp });
  } catch (err) {
    console.error(`Error submitting score for ${gameId}:`, err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
