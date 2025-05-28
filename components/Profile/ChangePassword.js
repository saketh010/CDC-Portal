//components/Profile/ChangePassword.js
import React, { useState} from 'react';

const ChangePassword = ({ userProfile }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handleInputChange}
                    placeholder="Old Password"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm New Password"
                    className="input input-bordered w-full"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
