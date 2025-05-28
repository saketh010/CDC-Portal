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

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if username matches admin pattern (admin + 3 digits)
      const isAdmin = /^admin\d{3}$/.test(username);
      
      // Verify password
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
      
      return res.status(200).json({
        message: 'Login successful',
        isAdmin: isAdmin
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
