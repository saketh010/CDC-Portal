import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const { email, otp } = req.body;

    // Debug logs
    console.log('Verifying OTP:');
    console.log('Email:', email);
    console.log('Received OTP:', otp);

    const user = await User.findOne({ email: email.trim() });
    
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid request' });
    }

    // Debug logs for stored values
    console.log('Found user:', user.email);
    console.log('Stored OTP:', user.resetPasswordOTP);
    console.log('Stored expiry:', user.resetPasswordOTPExpiry);

    if (!user.resetPasswordOTP) {
      console.log('No OTP found in user document');
      return res.status(400).json({ message: 'No OTP request found' });
    }

    if (new Date() > new Date(user.resetPasswordOTPExpiry)) {
      console.log('OTP expired');
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (user.resetPasswordOTP !== otp) {
      console.log('OTP mismatch:');
      console.log('Stored:', user.resetPasswordOTP);
      console.log('Received:', otp);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
  }
}