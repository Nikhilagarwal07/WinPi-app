// File: backend/routes/auth.js

import express from "express";
import fetch from "node-fetch";
import { signToken } from "../utils/jwt.js";
import User from '../models/User.js';

const router = express.Router();
const PI_API_URL = "https://api.minepi.com/v2/me";

const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
};

router.post("/verify", async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) return res.status(400).json({ success: false, message: "Access token is required." });

  try {
    const piServerResponse = await fetch(PI_API_URL, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!piServerResponse.ok) throw new Error("Invalid or expired access token.");
    const piUser = await piServerResponse.json();

    let user = await User.findOne({ piUid: piUser.uid });

    if (!user) {
      user = await User.create({
        piUid: piUser.uid,
        username: piUser.username,
        // The other fields (xp, gems, etc.) will use the defaults from the model
      });
      console.log(`✅ New user ${user.username} created with default stats.`);
    } else {
      const today = new Date();
      if (user.lastLogin.toDateString() !== today.toDateString()) {
        if (isYesterday(user.lastLogin)) {
          user.loginStreak += 1;
          user.gems += 20 * user.loginStreak;
        } else {
          user.loginStreak = 1;
        }
        user.gems += 50;
        user.lastLogin = Date.now();
        await user.save();
        console.log(`✅ Daily login rewards processed for ${user.username}.`);
      } else {
        console.log(`User ${user.username} already logged in today.`);
      }
    }

    const token = signToken({ piUid: user.piUid, username: user.username });
    res.json({ success: true, token, user: { username: user.username, piUid: user.piUid } });

  } catch (error) {
    console.error("Server-side verification error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export default router;