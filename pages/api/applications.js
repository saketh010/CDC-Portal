import connectToDatabase from '../../lib/mongodb';
import JobApplication from '../../models/JobApplication';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const { jobId, username } = req.body;

    // Check if already applied
    const existingApplication = await JobApplication.findOne({
      jobId,
      usernames: username
    });

    if (existingApplication) {
      return res.status(400).json({ 
        message: 'You have already applied for this job' 
      });
    }

    // Create or update application
    let application = await JobApplication.findOne({ jobId });
    if (application) {
      application.usernames.push(username);
      await application.save();
    } else {
      application = await JobApplication.create({
        jobId,
        usernames: [username]
      });
    }

    res.status(201).json(application);
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Error saving application' });
  }
}