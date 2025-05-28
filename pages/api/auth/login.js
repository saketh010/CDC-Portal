// pages/api/auth/login.js
import connectToDatabase from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import { generateToken } from '../../../utils/auth';
import cookie from 'cookie';

connectToDatabase();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate a JWT
      const token = generateToken(user);

      // Set the token in an HTTP-only cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        sameSite: 'strict',
        path: '/',
      }));
      
      // For other users, return to the home page
      res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
