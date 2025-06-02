import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

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
      } else if (res.status === 429) {
        if (data.remainingTime) {
          setCooldown(data.remainingTime);
          setError(`Please wait ${data.remainingTime} seconds before requesting another OTP`);
        } else {
          setError(data.message);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
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

      const cleanOtp = otp.toString().trim();
      if (!/^\d{6}$/.test(cleanOtp)) {
        setError('OTP must be 6 digits');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: cleanOtp })
      });

      const data = await res.json();
      if (res.ok) {
        setStep(3);
        setSuccess('OTP verified successfully');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
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
        if (data.errors && Array.isArray(data.errors)) {
          setError(data.errors.join(', '));
        } else if (data.message) {
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

  const validatePassword = (password) => {
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  return (
    <div className="flex px-4 items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
            <button 
              type="submit" 
              className="btn btn-primary w-full font-semibold" 
              disabled={loading || cooldown > 0}
            >
              <span className="text-black">
                {loading ? 'Sending...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Send OTP'}
              </span>
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
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
            <button type="submit" className="btn btn-primary w-full font-semibold" disabled={loading}>
              <span className="text-black">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </span>
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
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
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                {passwordChecks.length ? 
                  <FaCheck className="text-green-500" /> : 
                  <FaTimes className="text-red-500" />}
                <span className={passwordChecks.length ? "text-green-600" : "text-gray-600"}>
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {passwordChecks.uppercase ? 
                  <FaCheck className="text-green-500" /> : 
                  <FaTimes className="text-red-500" />}
                <span className={passwordChecks.uppercase ? "text-green-600" : "text-gray-600"}>
                  Contains uppercase letter
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {passwordChecks.lowercase ? 
                  <FaCheck className="text-green-500" /> : 
                  <FaTimes className="text-red-500" />}
                <span className={passwordChecks.lowercase ? "text-green-600" : "text-gray-600"}>
                  Contains lowercase letter
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {passwordChecks.number ? 
                  <FaCheck className="text-green-500" /> : 
                  <FaTimes className="text-red-500" />}
                <span className={passwordChecks.number ? "text-green-600" : "text-gray-600"}>
                  Contains number
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {passwordChecks.special ? 
                  <FaCheck className="text-green-500" /> : 
                  <FaTimes className="text-red-500" />}
                <span className={passwordChecks.special ? "text-green-600" : "text-gray-600"}>
                  Contains special character
                </span>
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-full font-semibold" 
              disabled={loading || !Object.values(passwordChecks).every(Boolean)}
            >
              <span className="text-black">
                {loading ? 'Resetting...' : 'Reset Password'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
