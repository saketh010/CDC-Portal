// utils/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

// Check if SECRET_KEY is defined
if (!SECRET_KEY) {
  throw new Error(
    'Please define the SECRET_KEY environment variable inside .env.local'
  );
}

/**
 * Generates a JWT for a given user.
 * @param {Object} user - The user object.
 * @returns {string} - Signed JWT.
 */
export function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' } // Token expires in 1 hour
  );
}

/**
 * Verifies a given JWT.
 * @param {string} token - The JWT to verify.
 * @returns {Object|null} - Decoded token if valid, otherwise null.
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
