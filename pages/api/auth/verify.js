import { verifyToken } from '../../../utils/auth';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Respond with a success message
        return res.status(200).json({ message: 'Token is valid' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
