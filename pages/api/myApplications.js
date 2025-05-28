import JobApplication from '../../models/JobApplication'; // Adjust the import path as necessary
import Job from '../../models/Job'; // Import the Job model

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const username = req.headers.username;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    try {
      // Find all job applications for the user
      const jobApplications = await JobApplication.find({ usernames: username });

      // Fetch the details for each applied job
      const jobsWithDetails = await Promise.all(
        jobApplications.map(async (application) => {

          // Ensure jobId is in an array format (if it's a single jobId, wrap it in an array)
          const jobIds = Array.isArray(application.jobId) ? application.jobId : [application.jobId];

          // Fetch jobs based on jobIds
          const jobs = await Job.find({ _id: { $in: jobIds } });

          if (jobs.length === 0) return null;
          // Map over each job found and return its details
          return jobs.map((job) => ({
            jobId: job._id,
            title: job.title,  // Ensure this field exists and is correctly populated
            description: job.description,  // Ensure this field exists and is correctly populated
            imageUrl: job.imageLink || 'default_image_url',  // Default if imageLink is not available
          }));
        })
      );

      // Flatten the array and remove null values
      const filteredJobs = jobsWithDetails.flat().filter((job) => job !== null);

      return res.status(200).json(filteredJobs);

    } catch (error) {
      console.error("Error fetching job applications:", error);  // Log any errors
      return res.status(500).json({ message: 'Error fetching job applications' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
