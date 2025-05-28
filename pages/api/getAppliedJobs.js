import JobApplication from "../../models/JobApplication";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Fetch all job applications for the user
    const applications = await JobApplication.find({ usernames: username });

    // Extract the job IDs from the applications
    const appliedJobIds = applications.map((application) => application.jobId);

    return res.status(200).json({ appliedJobIds });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
