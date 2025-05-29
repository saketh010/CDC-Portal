export function generateOTP() {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Optional: Add OTP validation function
export function validateOTP(otp) {
  // Check if OTP is 6 digits
  return /^\d{6}$/.test(otp);
}