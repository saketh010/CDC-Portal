import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageHead from '../components/SEO/PageHead'

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

export default function UserJobListPage(req) {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'open'

  // Fetch jobs on page load
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/jobFetch");
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data); // Set the filtered jobs initially to all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the active tab
  const filterJobs = (tab) => {
    setActiveTab(tab);
    if (tab === "open") {
      setFilteredJobs(jobs.filter((job) => job.isOpen));
    } else if (tab === "all") {
      setFilteredJobs(jobs); // 'all' tab shows all jobs
    }
  };

  // Toggle job status (admin closes/reopens jobs)
  const toggleJobStatus = async (jobId) => {
    try {
      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, isOpen: !job.isOpen } : job
      );
      setJobs(updatedJobs);
      filterJobs(activeTab); // Update the filtered list based on the active tab

      alert(
        `Job has been ${
          updatedJobs.find((job) => job.id === jobId).isOpen
            ? "reopened"
            : "closed"
        } successfully.`
      );
    } catch (error) {
      console.error("Error toggling job status:", error);
    }
  };

  return (
    <>
    <PageHead title="Job Listings" description="Explore active job listings for internships and placements, with details on roles, stipend, eligibility, and deadlines." />
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Radio Button Tabs for filtering jobs */}
      <div className="flex justify-center items-center py-5">
        <div className="join">
          <input
            className="join-item btn"
            type="radio"
            name="options"
            id="open"
            aria-label="Open Jobs"
            checked={activeTab === "open"}
            onChange={() => filterJobs("open")}
          />
          <input
            className="join-item btn"
            type="radio"
            name="options"
            id="all"
            aria-label="All Jobs"
            checked={activeTab === "all"}
            onChange={() => filterJobs("all")}
          />
        </div>
      </div>

      <div className="flex py-1 flex-wrap justify-center gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job._id} // Add a key prop to the outer element of your mapped items
              className="card card-compact bg-base-100 w-80 shadow-md"
            >
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
                    className="btn bg-blue-600 text-white"
                    onClick={() => router.push(`/jobDetailPage/${job._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}
