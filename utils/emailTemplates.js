export const getOTPEmailTemplate = (otp, attemptsLeft) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="text-align: center; color: #333333; font-size: 32px; margin-bottom: 40px;">Password Reset</h1>
      
      <div style="background-color: #f8f9fa; padding: 40px; border-radius: 8px; text-align: center;">
        <p style="color: #666666; font-size: 18px; margin-bottom: 20px;">Your OTP is:</p>
        
        <div style="font-size: 36px; letter-spacing: 8px; color: #007bff; font-weight: bold; margin: 30px 0;">
          ${otp}
        </div>
        
        <p style="color: #666666; font-size: 16px; margin-top: 20px;">
          Valid for 15 minutes only
        </p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666666; font-size: 14px;">
        <p>If you didn't request this password reset, please ignore this email.</p>
      </div>
    </div>
  `;
};