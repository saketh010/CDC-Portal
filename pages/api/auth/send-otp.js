import { generateOTP } from '../../../utils/otp';
import { sendEmail } from '../../../utils/nodemailer';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const { email } = req.body;

    // Debug log
    console.log('Received request for email:', email);

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Debug logs
    console.log('Generated OTP:', otp);
    console.log('Setting expiry:', otpExpiry);

    // Update user with OTP information
    const updateResult = await User.updateOne(
      { email: email.trim() },
      { 
        $set: { 
          resetPasswordOTP: otp,
          resetPasswordOTPExpiry: otpExpiry
        }
      },
      { new: true }
    );

    // Verify update
    console.log('Update result:', updateResult);

    // Double check the stored OTP
    const verifyUser = await User.findOne({ email: email.trim() });
    console.log('Stored OTP:', verifyUser.resetPasswordOTP);

    // Send email
    await sendEmail({
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Your OTP for password reset is: <strong>${otp}</strong></p>
          <p>This OTP will expire in 10 minutes.</p>
        </div>
      `
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
}