export const getTestUserEmailTemplate = (username, password) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="text-align: center; color: #333333; font-size: 28px; margin-bottom: 30px;">Test User & Admin Credentials</h1>

      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Test User Credentials:</h2>
        <p style="color: #555; font-size: 18px; margin-bottom: 10px;">Username:</p>
        <div style="font-size: 24px; color: #007bff; font-weight: bold;">${username}</div>

        <p style="color: #555; font-size: 18px; margin-top: 20px;">Password:</p>
        <div style="font-size: 24px; color: #dc3545; font-weight: bold;">${password}</div>
      </div>

      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px;">
        <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Admin Credentials:</h2>
        <p style="color: #555; font-size: 18px; margin-bottom: 10px;">Username:</p>
        <div style="font-size: 24px; color: #007bff; font-weight: bold;">admin123</div>

        <p style="color: #555; font-size: 18px; margin-top: 20px;">Password:</p>
        <div style="font-size: 24px; color: #dc3545; font-weight: bold;">admin123password</div>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666666; font-size: 14px;">
        <p>These are test credentials created for demo purposes. Do not share these credentials.</p>
      </div>
    </div>
  `;
};
