// pages/api/auth/profile.js
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
