// File: backend/routes/userRoutes.js

import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import User from "../models/User.js";
import UserGameData from "../models/UserGameData.js"; // 1. Import UserGameData
import UserInventory from "../models/UserInventory.js"; // 2. Import UserInventory

const router = express.Router();

// This route gets the main user profile data (XP, Gems, etc.)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ piUid: req.user.piUid }).select("-piUid");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// --- NEW ROUTE TO GET ALL HIGH SCORES FOR A USER ---
router.get("/me/game-data", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find all game data documents for this user
    const gameData = await UserGameData.find({ user: user._id });

    // Convert the array into a more useful object format, e.g., { 'pi-clicker': 150 }
    const highScores = gameData.reduce((acc, data) => {
      acc[data.gameId] = data.highScore;
      return acc;
    }, {});

    res.json(highScores);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me/inventory", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) return res.status(404).json({ message: "User not found." });

    const inventory = await UserInventory.find({ user: user._id });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// --- NEW ROUTE TO EQUIP AN ITEM ---
router.post("/me/equip-item", authMiddleware, async (req, res) => {
  const { itemId, itemType } = req.body;
  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) return res.status(404).json({ message: "User not found." });

    // In the future, you can use a switch case for different item types
    if (itemType === "border") {
      user.equippedBorder = itemId;
    }

    await user.save();
    res.json({ success: true, updatedUser: user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
