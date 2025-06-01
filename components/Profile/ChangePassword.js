//components/Profile/ChangePassword.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";

const ChangePassword = ({ userProfile }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        otp: '',
        newPassword: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
    });
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
    const [otpSuccess, setOtpSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
        if (name === 'newPassword') {
            validatePassword(value);
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

    const validatePasswords = () => {
        if (passwordData.newPassword.length < 6) {
            return "New password must be at least 6 characters long.";
        }
        if (!Object.values(passwordChecks).every(Boolean)) {
            return "Password does not meet all requirements.";
        }
        return '';
    };

    const handleSendOtp = async () => {
        setOtpLoading(true);
        setError('');
        setOtpSuccess('');
        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userProfile.email }),
            });
            if (response.ok) {
                setOtpSent(true);
                setOtpSuccess('OTP sent to your email.');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to send OTP.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setOtpVerifyLoading(true);
        setError('');
        setOtpSuccess('');
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userProfile.email, otp: passwordData.otp }),
            });
            if (response.ok) {
                setOtpVerified(true);
                setOtpSuccess('OTP verified! You can now set a new password.');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid OTP.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setOtpVerifyLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validatePasswords();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');
        setSuccessMessage('');
        try {
            const response = await fetch('/api/auth/changepassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...passwordData, username: userProfile.username }),
            });
            if (response.ok) {
                setSuccessMessage('Password changed successfully.');
                setPasswordData({ oldPassword: '', otp: '', newPassword: '' });
                setOtpSent(false);
                setOtpVerified(false);
                setOtpSuccess('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to change password.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl text-black font-bold mb-4 text-center">Change Password</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                {otpSuccess && <p className="text-green-500 text-center mb-4">{otpSuccess}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Old Password */}
                    <div className="relative">
                        <input
                            type={showPasswords.oldPassword ? "text" : "password"}
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handleInputChange}
                            placeholder="Old Password"
                            className="input input-bordered w-full pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => togglePasswordVisibility('oldPassword')}
                        >
                            {showPasswords.oldPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* OTP */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            name="otp"
                            value={passwordData.otp}
                            onChange={handleInputChange}
                            placeholder="Enter OTP"
                            className="input input-bordered w-full pr-24"
                            disabled={otpVerified}
                            required
                        />
                        {!otpSent ? (
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-sm btn-primary"
                                onClick={handleSendOtp}
                                disabled={otpLoading}
                            >
                                {otpLoading ? 'Sending...' : 'Send OTP'}
                            </button>
                        ) : !otpVerified ? (
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-sm btn-success"
                                onClick={handleVerifyOtp}
                                disabled={otpVerifyLoading || !passwordData.otp}
                            >
                                {otpVerifyLoading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        ) : null}
                    </div>
                    {/* New Password */}
                    <div className="relative">
                        <input
                            type={showPasswords.newPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleInputChange}
                            placeholder="New Password"
                            className="input input-bordered w-full pr-10"
                            required
                            disabled={!otpVerified}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => togglePasswordVisibility('newPassword')}
                        >
                            {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* Password checks - always visible below new password */}
                    <div className="w-full mt-2">
                        <h3 className="text-md font-semibold mb-2">Password must contain:</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                                {passwordChecks.length ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                                <span className={passwordChecks.length ? "text-green-600" : "text-gray-600"}>
                                    At least 8 characters
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {passwordChecks.uppercase ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                                <span className={passwordChecks.uppercase ? "text-green-600" : "text-gray-600"}>
                                    Uppercase letter
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {passwordChecks.lowercase ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                                <span className={passwordChecks.lowercase ? "text-green-600" : "text-gray-600"}>
                                    Lowercase letter
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {passwordChecks.number ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                                <span className={passwordChecks.number ? "text-green-600" : "text-gray-600"}>
                                    Number
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {passwordChecks.special ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                                <span className={passwordChecks.special ? "text-green-600" : "text-gray-600"}>
                                    Special character
                                </span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={!otpVerified || !Object.values(passwordChecks).every(Boolean)}>Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
