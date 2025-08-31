// File: backend/utils/jwt.js

import jwt from 'jsonwebtoken';

// The secret key will now be read at the time of token creation,
// ensuring it has been loaded from the .env file first.
const expiration = '24h';

export function signToken({ username, uid }) {
  const payload = { username, uid };
  const secret = process.env.JWT_SECRET; // Moved this line here

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function verifyToken(token) {
  try {
    const secret = process.env.JWT_SECRET; // Also read it here for verification
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (err) {
    console.log('Invalid token');
    return null;
  }
}