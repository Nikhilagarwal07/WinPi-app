// // File: backend/routes/gameRoutes.js

// import express from 'express';
// import { authMiddleware } from '../utils/authMiddleware.js';
// import User from '../models/User.js';
// import GameScore from '../models/GameScore.js';

// const router = express.Router();

// router.post('/submit-score', authMiddleware, async (req, res) => {
//   // 1. Destructure both score and gameId from the request body
//   const { score, gameId } = req.body;
  
//   if (typeof score !== 'number' || score < 0) {
//     return res.status(400).json({ message: 'Invalid score.' });
//   }

//   // 2. Add a simple validation for the gameId
//   if (!gameId || typeof gameId !== 'string') {
//     return res.status(400).json({ message: 'Missing or invalid gameId.' });
//   }

//   try {
//     const user = await User.findOne({ piUid: req.user.piUid });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     user.xp += score;
//     await user.save();

//     // 3. Use the dynamic gameId when creating the record
//     await GameScore.create({
//       user: user._id,
//       game: gameId,
//       score: score,
//     });

//     res.json({ success: true, message: 'Score submitted successfully!', newXp: user.xp });
//   } catch (err) {
//     console.error("Error submitting score:", err);
//     res.status(500).json({ message: 'Server error while submitting score.' });
//   }
// });

// export default router;