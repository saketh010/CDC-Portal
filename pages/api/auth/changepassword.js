import bcrypt from 'bcryptjs';
import User from '../../../models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, oldPassword, newPassword } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect.' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);

            await User.findOneAndUpdate(
                {username},
                {password: hashedPassword},
                {new: true}
            )

            return res.status(200).json({ message: 'Password updated successfully.' });
        } catch (error) {
            return res.status(500).json({ message: 'Server error. Please try again.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}
