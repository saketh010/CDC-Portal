import Job from "../../models/Job"; // Mongoose model for Job

// Default export of the handler function
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; // Get the job id from the query string (for update)

  switch (method) {
    // Handle PUT requests for updating an existing job by ID
    case "PUT":
      try {
        if (!id) {
          return res.status(400).json({ message: "Job ID is required for update" });
        }

        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedJob) {
          return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json(updatedJob);
      } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({ message: "Error updating job", error });
      }

    // Handle POST requests to add a new job
    case "POST":
      try {
        const newJob = new Job(req.body);

        // Save the new job to the database
        await newJob.save();

        return res.status(201).json(newJob);
      } catch (error) {
        console.error("Error adding job:", error);
        return res.status(500).json({ message: "Error adding job", error });
      }

    // Default case for unsupported HTTP methods
    default:
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
