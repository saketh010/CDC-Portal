//pages/api/auth/updateprofile.js
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, firstName, middleName, lastName, phone, email, gender, category, dob, nationality, hometown, currentCity } = req.body;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        {
          firstName,
          middleName,
          lastName,
          phone,
          email,
          gender,
          category,
          dob, 
          nationality,
          hometown,
          currentCity,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
