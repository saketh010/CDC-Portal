import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, res }) {
  // Check if the token exists in cookies
  const token = req.cookies.token;

  if (!token) {
    // If no token, redirect to login page
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If authenticated, return page props
  return {
    props: {},
  };
}

export default function AdminJobListPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'open', 'closed'

  // Fetch jobs on page load
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/jobFetch");
        const data = await res.json();
        setJobs(data); // Set the jobs array
        setFilteredJobs(data); // Set the filtered jobs initially to all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleAddJob = () => {
    router.push("/admin/postjob");
  };

  const handleEditJob = (jobId) => {
    router.push(`/admin/postjob?id=${jobId}`);
  };

  const toggleJobStatus = async (jobId) => {
    try {
      const jobToUpdate = jobs.find((job) => job._id === jobId);
      if (!jobToUpdate) {
        console.error("Job not found");
        return;
      }
  
      // Toggle the job's status locally
      const updatedJob = { ...jobToUpdate, isOpen: !jobToUpdate.isOpen };
  
      // Optimistically update the UI by immediately setting the updated job state
      const updatedJobs = jobs.map((job) =>
        job._id === jobId ? updatedJob : job
      );
  
      // Update the jobs state and re-filter the list based on the active tab
      setJobs(updatedJobs); // Updating state
  
      // Update the job status in the database via API
      const res = await fetch(`/api/jobupdate?id=${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isOpen: updatedJob.isOpen }),
      });
  
      if (res.ok) {
        alert(`Job has been ${updatedJob.isOpen ? "reopened" : "closed"} successfully.`);
      } else {
        console.error("Error updating job status:", await res.text());
      }
    } catch (error) {
      console.error("Error toggling job status:", error);
    }
  };
  
  
  useEffect(() => {
    if (activeTab === "open") {
      setFilteredJobs(jobs.filter((job) => job.isOpen));
    } else if (activeTab === "closed") {
      setFilteredJobs(jobs.filter((job) => !job.isOpen));
    } else {
      setFilteredJobs(jobs); // 'all' tab shows all jobs
    }
  }, [jobs, activeTab]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <button onClick={handleAddJob} className="btn btn-primary">
          Add Job
        </button>
      </div>

      {/* Radio Button Tabs for filtering jobs */}
      <div className="flex justify-center items-center py-5">
        <div className="join">
          <input
            className="join-item btn"
            type="radio"
            name="options"
            id="open"
            aria-label="Open"
            checked={activeTab === "open"}
            onChange={() => setActiveTab("open")}
          />
          <input
            className="join-item btn"
            type="radio"
            name="options"
            id="closed"
            aria-label="Closed Jobs"
            checked={activeTab === "closed"}
            onChange={() => setActiveTab("closed")}
          />
          <input
            className="join-item btn"
            type="radio"
            name="options"
            id="all"
            aria-label="All Jobs"
            checked={activeTab === "all"}
            onChange={() => setActiveTab("all")}
          />
        </div>
      </div>

      <div className="flex py-1 flex-wrap justify-center gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="card card-compact bg-base-100 w-80 shadow-md">
              <figure className="h-48 w-full overflow-hidden">
                <img
                  src={job.imageLink}
                  alt={job.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{job.title}</h2>
                <p>{job.description}</p>
                <div className="card-actions justify-end flex gap-2">
                  <button
                    className="btn btn-info"
                    onClick={() => handleEditJob(job._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`btn ${job.isOpen ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
                    onClick={() => toggleJobStatus(job._id)}
                  >
                    {job.isOpen ? "Close Job" : "Reopen Job"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
