// pages/api/jobs.js
import Job from '../../models/Job';

export default async function handler(req, res) {

    if (req.method === 'GET') {

        try {
          const job = await Job.find({});
    
          if (!job) {
            return res.status(404).json({ error: 'Job not found' });
          }
          return res.status(200).json(job);
        } catch (error) {
          console.error('Error fetching job:', error.message);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }
}
