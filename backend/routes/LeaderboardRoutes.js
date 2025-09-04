// File: backend/routes/leaderboardRoutes.js

import express from 'express';
import User from '../models/User.js';
import GameScore from '../models/GameScore.js';

const router = express.Router();

router.get('/:filter', async (req, res) => {
  const { filter } = req.params;

  try {
    let leaderboard;

    if (filter === 'all-time') {
      // Fetch top 100 users sorted by total XP
      leaderboard = await User.find({})
        .sort({ xp: -1 })
        .limit(100)
        .select('username xp');
    } else if (filter === 'weekly') {
      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Use an aggregation pipeline to calculate weekly scores
      leaderboard = await GameScore.aggregate([
        {
          $match: {
            createdAt: { $gte: sevenDaysAgo },
          },
        },
        {
          $group: {
            _id: '$user',
            weeklyScore: { $sum: '$score' },
          },
        },
        {
          $sort: { weeklyScore: -1 },
        },
        {
          $limit: 100,
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'userData',
          },
        },
        {
          $unwind: '$userData',
        },
        {
          $project: {
            _id: 0,
            username: '$userData.username',
            xp: '$weeklyScore',
          },
        },
      ]);
    } else {
      return res.status(400).json({ message: 'Invalid filter.' });
    }

    res.json(leaderboard);
  } catch (err) {
    console.error(`Error fetching ${filter} leaderboard:`, err);
    res.status(500).json({ message: 'Server error while fetching leaderboard.' });
  }
});

export default router;