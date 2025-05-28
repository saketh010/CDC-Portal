import { useEffect, useState } from 'react';

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
  
export default function MyApplicationsPage() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the username from localStorage
    const username = localStorage.getItem('username');
    if (!username) {
      setError('You must be logged in to view your applications.');
      setLoading(false);
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch('/api/myApplications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'username': username, // Send username as header
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch applied jobs');
        }

        const data = await res.json();
        console.log(data); // Check the fetched job details
        setAppliedJobs(data); // Set the state with full job details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  // Withdraw from a job
  const handleWithdraw = async (jobId) => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('You must be logged in to withdraw from a job.');
      return;
    }

    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId, username }),
      });

      if (res.ok) {
        setAppliedJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
        alert('You have successfully withdrawn from the job.');
      } else {
        throw new Error('Failed to withdraw');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading your applications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex py-10 flex-wrap justify-center gap-4">
          {appliedJobs.map((job) => (
            <div key={job.jobId} className="card card-compact bg-base-100 w-80 shadow-md">
              <figure className="h-48 w-full overflow-hidden">
                <img
                  src={job.imageUrl || 'default_image_url'} // Fallback to default image if not available
                  alt={job.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{job.title}</h2>
                <p>{job.description}</p>
                <div className="card-actions justify-end flex gap-2">
                  <button
                    className="btn bg-red-600 text-white hover:bg-red-400"
                    onClick={() => handleWithdraw(job.jobId)}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
