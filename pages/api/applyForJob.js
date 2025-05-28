import JobApplication from '../../models/JobApplication';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { jobId, username } = req.body;

    // Validate input
    if (!jobId || !username) {
      return res.status(400).json({ error: 'Job ID and Username are required' });
    }

    try {
      const normalizedUsername = username.trim().toLowerCase();

      // Check if a job application already exists for the given jobId
      const existingApplication = await JobApplication.findOne({ jobId });

      if (existingApplication) {
        if (!Array.isArray(existingApplication.usernames)) {
          existingApplication.usernames = [];
        }

        // Normalize the array of usernames
        const normalizedUsernames = existingApplication.usernames.map((user) =>
          user.trim().toLowerCase()
        );

        // Check if the normalized username already exists
        if (normalizedUsernames.includes(normalizedUsername)) {
          return res
            .status(400)
            .json({ error: 'You have already applied for this job' });
        }

        // Add the username to the usernames array
        existingApplication.usernames.push(username);
        await existingApplication.save();

        return res.status(200).json({ message: 'Application submitted successfully' });
      }

      // If no application exists, create a new one
      const newApplication = new JobApplication({
        jobId,
        usernames: [username], // Initialize with the first username
      });

      await newApplication.save();

      return res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error applying for job:', error.message);
      return res.status(500).json({ error: 'Failed to apply for the job' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
