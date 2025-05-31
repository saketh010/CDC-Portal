import { useState } from 'react';
import { useRouter } from 'next/router';
import PageHead from '../components/SEO/PageHead';

export default function TestUserPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setEmailSent(false);
    setLoading(true);

    try {
      const res = await fetch('/api/generate-test-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmailSent(true);
      } else {
        setError(data.message || 'Unable to create test user');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHead title="Create Test User" description="Create a test user for the SVNIT Career Portal to explore features and functionalities." />
      <div className="h-[75vh] flex items-center justify-center bg-gray-100">
        <div className="max-w-xl p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create Test User</h2>
          <form className="flex flex-col gap-4" onSubmit={handleCreateUser}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || emailSent}
            />
            <button type="submit" className="btn btn-primary w-full text-lg p-3" disabled={loading || emailSent}>
              {loading ? 'Creating...' : 'Create Test User'}
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            {emailSent && (
              <p className="text-green-600 text-center mt-4">
                Email sent! Redirect to login?{' '}
                <button
                  className="text-blue-600 underline"
                  onClick={() => router.push('/')}
                  type="button"
                >
                  Click here
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
