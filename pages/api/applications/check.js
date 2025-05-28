import connectToDatabase from '../../../lib/mongodb';
import JobApplication from '../../../models/JobApplication';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { jobId, username } = req.query;

    const application = await JobApplication.findOne({ 
      jobId,
      usernames: username 
    });

    res.status(200).json({ hasApplied: !!application });
  } catch (error) {
    console.error('Error checking application:', error);
    res.status(500).json({ message: 'Error checking application status' });
  }
}