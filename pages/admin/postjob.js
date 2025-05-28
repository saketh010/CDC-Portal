import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PostJobPage(req, res) {
  const router = useRouter();
  const { id } = router.query;
  const [jobDetails, setJobDetails] = useState({
    company: "",
    about: "",
    title: "",
    description: "",
    CGPA: "",
    stipend: "",
    oaDate: "",
    interviewDate: "",
    location: "",
    duration: "",
    imageLink: "",
    isOpen: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch job details when editing
  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const res = await fetch(`/api/jobDetail?id=${id}`);
          if (res.ok) {
            const data = await res.json();
            const jobData = data.find((j) => j._id === id);  // Check if your data uses _id
            if (jobData) {
              setJobDetails(jobData);
              setIsEditing(true);
            } else {
              setError("Job not found");
            }
          } else {
            setError("Failed to fetch job details");
          }
        } catch (error) {
          console.error("Error fetching job details:", error);
          setError("Error fetching job details.");
        }
      };
      fetchJobDetails();
    }
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for adding or updating a job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Reset error on submit

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/jobupdate?id=${id}` : "/api/jobupdate";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });

      if (res.ok) {
        alert(isEditing ? "Job updated successfully!" : "Job posted successfully!");
        router.push("/admin/listjob");
      } else {
        setError("Failed to submit job details.");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isEditing ? "Edit Job" : "Post a New Job"}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="company"
            value={jobDetails.company}
            onChange={handleChange}
            placeholder="Enter the company name"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* About */}
        <div>
          <label className="block font-medium">About the Company</label>
          <textarea
            name="about"
            value={jobDetails.about}
            onChange={handleChange}
            placeholder="Enter details about the company"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            placeholder="Enter the job title"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block font-medium">Job Description</label>
          <textarea
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            placeholder="Enter the job description"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* CGPA Requirement */}
        <div>
          <label className="block font-medium">CGPA Requirement</label>
          <input
            type="number"
            step="0.1"
            name="CGPA"
            value={jobDetails.CGPA}
            onChange={handleChange}
            placeholder="Enter the CGPA requirement"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Stipend */}
        <div>
          <label className="block font-medium">Stipend</label>
          <input
            type="number"
            name="stipend"
            value={jobDetails.stipend}
            onChange={handleChange}
            placeholder="Enter the stipend amount"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Online Assessment Date */}
        <div>
          <label className="block font-medium">Online Assessment Date</label>
          <input
            type="date"
            name="oaDate"
            value={jobDetails.oaDate}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Interview Date */}
        <div>
          <label className="block font-medium">Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            value={jobDetails.interviewDate}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            placeholder="Enter the job location"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={jobDetails.duration}
            onChange={handleChange}
            placeholder="Enter the job duration"
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Image Link */}
        <div>
          <label className="block font-medium">Image Link</label>
          <input
            type="url"
            name="imageLink"
            value={jobDetails.imageLink}
            onChange={handleChange}
            placeholder="Enter the image link"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
        >
          {isSubmitting ? "Submitting..." : isEditing ? "Update Job" : "Post Job"}
        </button>
      </form>
    </div>
  );
}
