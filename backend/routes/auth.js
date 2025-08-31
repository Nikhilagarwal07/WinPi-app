// File: backend/routes/auth.js

import express from "express";
import fetch from "node-fetch";
import { signToken } from "../utils/jwt.js";
import User from '../models/User.js'; // Import the User model

const router = express.Router();
const PI_API_URL = "https://api.minepi.com/v2/me";

router.post("/verify", async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ success: false, message: "Access token is required." });
  }

  try {
    const piServerResponse = await fetch(PI_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!piServerResponse.ok) {
        console.error("Pi API Error:", piServerResponse.statusText);
        return res.status(401).json({ success: false, message: "Invalid or expired access token." });
    }

    const piUser = await piServerResponse.json();
    console.log(`✅ Pi API verification successful for user: ${piUser.username}`);

    // --- DATABASE INTERACTION ---
    // Find a user with the given Pi UID. If they don't exist, create them.
    let user = await User.findOne({ piUid: piUser.uid });

    if (!user) {
      console.log(`User ${piUser.username} not found in DB. Creating new user...`);
      user = await User.create({
        piUid: piUser.uid,
        username: piUser.username,
      });
    } else {
      console.log(`User ${piUser.username} found in DB. Updating last login.`);
      user.lastLogin = Date.now();
      await user.save();
    }
    // --- END DATABASE INTERACTION ---

    const token = signToken({ uid: user.piUid, username: user.username });
    
    res.json({ 
        success: true, 
        token, 
        user: {
            username: user.username,
            uid: user.piUid
        }
    });

  } catch (error) {
    console.error("Server-side verification error:", error);
    return res.status(500).json({ success: false, message: "Internal server error during verification." });
  }
});

export default router;