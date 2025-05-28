//components/Profile/ChangePassword.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = ({ userProfile }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const validatePasswords = () => {
        if (passwordData.newPassword.length < 6) {
            return "New password must be at least 6 characters long.";
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return "New password and confirm password do not match.";
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validatePasswords();
        if (validationError) {
            setError(validationError);
            return;
        }
        console.log(userProfile);
        setError('');
        setSuccessMessage('');
        try {
            const response = await fetch('/api/auth/changepassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...passwordData, username: userProfile.username}),              
            });

            if (response.ok) {
                setSuccessMessage('Password changed successfully.');
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
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
                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div className="relative">
                        <input
                            type={showPasswords.newPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleInputChange}
                            placeholder="New Password"
                            className="input input-bordered w-full pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => togglePasswordVisibility('newPassword')}
                        >
                            {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showPasswords.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm New Password"
                            className="input input-bordered w-full pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                        >
                            {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
