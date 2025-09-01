// File: backend/utils/authMiddleware.js

import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing!' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
      console.error('JWT_SECRET is not set in the environment!');
      return res.status(500).json({ message: 'Internal server error: Missing secret.' });
  }

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data; // Attach user payload to the request
    next(); // Proceed to the next route
  } catch (err) {
    console.error('❌ Invalid token error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token!' });
  }
}