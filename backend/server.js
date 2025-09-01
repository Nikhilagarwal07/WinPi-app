// File: backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';

// Load environment variables right at the start.
dotenv.config();

import authRoutes from "./routes/auth.js";
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // Corrected from /api/user

// --- DATABASE CONNECTION ---
// We will connect to the database here, directly in the main server file.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winpi-db')
  .then(() => {
    console.log('✅ Database connected successfully.');
    // Only start the server if the database connection is successful
    app.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`❌ Database connection error: ${err}`);
    process.exit(1); // Exit if we can't connect
  });