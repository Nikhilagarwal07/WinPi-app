// File: backend/routes/userRoutes.js

import express from 'express';
import { authMiddleware } from '../utils/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ piUid: req.user.piUid }).select('-__v');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found in database' });
    }
    
    res.json(user);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
});

export default router;