// File: backend/utils/jwt.js

import jwt from 'jsonwebtoken';

const expiration = '24h';

// This function creates the JWT. It reads the secret directly, which is safe
// because server.js loads it before any routes are called.
export function signToken({ username, piUid }) {
  const payload = { username, piUid };
  const secret = process.env.JWT_SECRET;
  
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}