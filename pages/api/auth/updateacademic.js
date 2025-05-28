//pages/api/auth/updateacademic.js

import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
      const {
          username,
          tenthYear,
          twelfthYear,
          tenthPercent,
          twelfthPercent,
          tenthBoard,
          twelfthBoard,
          degree,
          department,
          activeBacklog,
          previousBacklog,
          cgpa,
      } = req.body;

      if (!username) {
          return res.status(400).json({ success: false, message: 'Username is required' });
      }

      try {
          const updatedUser = await User.findOneAndUpdate(
              { username },
              {
                  $set: {
                      tenthYear,
                      twelfthYear,
                      tenthPercent,
                      twelfthPercent,
                      tenthBoard,
                      twelfthBoard,
                      degree,
                      department,
                      activeBacklog,
                      previousBacklog,
                      cgpa,
                  },
              },
              { new: true, runValidators: true }
          );

          if (!updatedUser) {
              return res.status(404).json({ success: false, message: 'User not found' });
          }

          return res.status(200).json({ success: true, user: updatedUser });
      } catch (error) {
          console.error('Error updating profile:', error);
          return res.status(500).json({ success: false, message: 'Error updating profile' });
      }
  } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}