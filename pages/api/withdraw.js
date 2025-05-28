// pages/api/withdraw.js
import JobApplication from '../../models/JobApplication';  // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { jobId, username } = req.body;

    if (!jobId || !username) {
      return res.status(400).json({ message: 'Job ID and username are required' });
    }

    try {
      const jobApplication = await JobApplication.findOne({ jobId });

      if (!jobApplication || !jobApplication.usernames.includes(username)) {
        return res.status(404).json({ message: 'You have not applied for this job' });
      }

      // Remove the username from the job application
      jobApplication.usernames = jobApplication.usernames.filter(
        (user) => user !== username
      );

      await jobApplication.save();

      return res.status(200).json({ message: 'Withdrawal successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Error withdrawing from the job' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
