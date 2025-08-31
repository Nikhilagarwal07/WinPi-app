// File: backend/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  piUid: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields here later, like piBalance, highScores, etc.
});

const User = mongoose.model('User', userSchema);

export default User;