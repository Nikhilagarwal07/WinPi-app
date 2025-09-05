import express from "express";
import User from "../models/User.js";
import GameScore from "../models/GameScore.js";

const router = express.Router();

router.get("/:filter", async (req, res) => {
  const { filter } = req.params;

  try {
    let leaderboard;

    if (filter === "all-time") {
      leaderboard = await User.find({})
        .sort({ xp: -1 })
        .limit(100)
        .select("username xp");
    } else if (filter === "weekly") {
      // --- LOGIC FOR FIXED MONDAY-SUNDAY WEEK ---
      const now = new Date();
      const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ...
      const diffToMonday =
        now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

      const startOfWeek = new Date(now.setDate(diffToMonday));
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      // --- END OF MODIFIED LOGIC ---

      leaderboard = await GameScore.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfWeek, $lte: endOfWeek },
          },
        },
        {
          $group: {
            _id: "$user",
            weeklyScore: { $sum: "$score" },
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
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $project: {
            _id: 0,
            username: "$userData.username",
            xp: "$weeklyScore",
          },
        },
      ]);
    } else {
      return res.status(400).json({ message: "Invalid filter." });
    }

    res.json(leaderboard);
  } catch (err) {
    console.error(`Error fetching ${filter} leaderboard:`, err);
    res
      .status(500)
      .json({ message: "Server error while fetching leaderboard." });
  }
});

export default router;
