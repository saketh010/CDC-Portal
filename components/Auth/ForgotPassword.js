import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('OTP sent to your email');
        setStep(2);
      } else {
        setError(data.message);
      }    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (!otp || !email) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      // Clean and validate OTP
      const cleanOtp = otp.toString().trim();
      if (!/^\d{6}$/.test(cleanOtp)) {
        setError('OTP must be 6 digits');
        setLoading(false);
        return;
      }

      console.log('Verifying OTP:', {
        email: email.trim(),
        otp: cleanOtp
      });

      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(),
          otp: cleanOtp
        })
      });

      const data = await res.json();
      console.log('Verification response:', data);

      if (res.ok) {
        setStep(3);
        setSuccess('OTP verified successfully');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess('Password reset successfully');
        setTimeout(() => router.push('/'), 2000);
      } else {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          // If there are multiple validation errors, join them
          setError(data.errors.join(', '));
        } else if (data.message) {
          // Single error message
          setError(data.message);
        } else {
          setError('Failed to reset password');
        }
      }
    } catch (err) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>            <input
              type="text"
              value={otp}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/\D/g, '');
                // Limit to 6 digits
                if (value.length <= 6) {
                  setOtp(value);
                }
              }}
              placeholder="Enter OTP"
              className="input input-bordered w-full"
              pattern="\d{6}"
              maxLength={6}
              required
            />
          </div>          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="input input-bordered w-full pr-10"
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
          </p>
          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}