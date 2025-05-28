//pages/api/auth/updatecollegeinfo.js
import User from '../../../models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { batchOfPassing, resumes, codingProfiles, username } = req.body;
        try {
            const user = await User.findOneAndUpdate(
                { username },
                {
                    batchOfPassing,
                    resumes, 
                    codingProfiles
                },
                { new: true }
            );

            console.log('user', user);

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    return res.status(400).json({ success: false, message: 'Invalid request method' });
}
