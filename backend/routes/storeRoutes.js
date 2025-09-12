// File: backend/routes/storeRoutes.js

import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import User from "../models/User.js";
import UserInventory from "../models/UserInventory.js";
import { storeItems } from "./storeItems.js";

const router = express.Router();

router.get("/items", (req, res) => {
  try {
    // We simply return the list of items from our config file.
    // In a larger application, this data might come from a dedicated 'Items' collection in the database.
    res.json(storeItems);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching store items." });
  }
});

router.post("/purchase-item", authMiddleware, async (req, res) => {
  const { itemId } = req.body;
  const item = storeItems.find((i) => i.itemId === itemId);

  if (!item) {
    return res.status(404).json({ message: "Item not found." });
  }

  try {
    const user = await User.findOne({ piUid: req.user.piUid });
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.gems < item.cost) {
      return res.status(400).json({ message: "Not enough gems!" });
    }

    const alreadyOwns = await UserInventory.findOne({
      user: user._id,
      itemId: item.itemId,
    });
    if (alreadyOwns) {
      return res.status(400).json({ message: "You already own this item." });
    }

    // Process the purchase
    user.gems -= item.cost;
    await user.save();
    await UserInventory.create({ user: user._id, itemId: item.itemId });

    const updatedUser = await User.findById(user._id);
    const inventory = await UserInventory.find({ user: user._id });

    res.json({
      success: true,
      message: "Purchase successful!",
      updatedUser,
      inventory,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during purchase." });
  }
});

export default router;
