// File: backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables right at the start.
dotenv.config();

// Standard routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

// Game-specific routes from their new locations
import clickerRoutes from "./routes/games/ClickerGame/index.js";
import quizRoutes from "./routes/games/QuizGame/index.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Standard API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Game API routes
app.use("/api/games/clicker", clickerRoutes);
app.use("/api/games/quiz", quizRoutes);

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/winpi-db")
  .then(() => {
    console.log("✅ Database connected successfully.");
    // Only start the server if the database connection is successful
    app.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`❌ Database connection error: ${err}`);
    process.exit(1); // Exit if we can't connect
  });
