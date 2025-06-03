import { generateOTP } from '../../../utils/otp';
import { sendEmail } from '../../../utils/nodemailer';
import { getOTPEmailTemplate } from '../../../utils/emailTemplates';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import DailyAttempts from '../../../models/DailyAttempts';
import OtpAttempt from '../../../models/OtpAttempt';

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

    // cooldown period
    const lastAttempt = await OtpAttempt.findOne({ email: email.trim() })
      .sort({ lastAttempt: -1 });

    if (lastAttempt) {
      const cooldownPeriod = 3 * 60 * 1000;
      const timeSinceLastAttempt = Date.now() - lastAttempt.lastAttempt.getTime();
      
      if (timeSinceLastAttempt < cooldownPeriod) {
        const remainingTime = Math.ceil((cooldownPeriod - timeSinceLastAttempt) / 1000);
        return res.status(429).json({ 
          message: `Please wait ${remainingTime} seconds before requesting another OTP`,
          remainingTime
        });
      }
    }

    // daily attempts
    let dailyAttempts = await DailyAttempts.findOne({ email: email.trim() });
    
    if (!dailyAttempts) {
      dailyAttempts = new DailyAttempts({ email: email.trim() });
    } else {
      // Check if we need to reset attempts (new day)
      const now = new Date();
      const lastReset = new Date(dailyAttempts.lastReset);
      
      // Set both dates to midnight for proper comparison
      const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastResetMidnight = new Date(lastReset.getFullYear(), lastReset.getMonth(), lastReset.getDate());
      
      if (nowMidnight.getTime() > lastResetMidnight.getTime()) {
        dailyAttempts.attemptsLeft = 10;
        dailyAttempts.lastReset = nowMidnight;
      }
    }

    if (dailyAttempts.attemptsLeft <= 0) {
      return res.status(429).json({ 
        message: 'You have reached the maximum number of OTP attempts for today. Please try again tomorrow.'
      });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new OTP attempt
    const otpAttempt = new OtpAttempt({
      email: email.trim(),
      otp,
      expiresAt: otpExpiry,
      lastAttempt: new Date()
    });

    // Update user with OTP information
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;
    
    // Decrease attempts left
    dailyAttempts.attemptsLeft -= 1;

    // Save all changes
    await Promise.all([
      user.save(),
      otpAttempt.save(),
      dailyAttempts.save()
    ]);

    await sendEmail({
      to: email,
      subject: 'Password Reset',
      html: getOTPEmailTemplate(otp, dailyAttempts.attemptsLeft)
    });

    res.status(200).json({ 
      message: 'OTP sent successfully',
      attemptsLeft: dailyAttempts.attemptsLeft
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
}