// pages/api/auth/logout.js
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the token cookie by setting maxAge to 0
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0, // Expire the cookie immediately
        path: '/', // Ensure it applies to the whole site
      })
    );

    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
