// File: backend/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  piUid: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  xp: { type: Number, default: 0, required: true },
  gems: { type: Number, default: 100, required: true },
  loginStreak: { type: Number, default: 1, required: true },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;