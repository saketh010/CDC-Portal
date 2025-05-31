import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageHead from '../components/SEO/PageHead';

export default function TestUserPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (!emailSent) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [emailSent, router]);

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
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHead
        title="Create Test User"
        description="Create a test user to explore features."
      />
      {/* <div className="min-h-[75vh] flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Test User
          </h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full py-3 px-4 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || emailSent}
              required
            />
            <button
              type="submit"
              disabled={loading || emailSent}
              className="btn btn-primary w-full py-3 text-base"
            >
              {loading ? 'Creating...' : 'Create Test User'}
            </button>
            {error && (
              <p className="text-red-600 text-center mt-2">{error}</p>
            )}
            {emailSent && (
              <p className="text-green-700 text-center mt-2">
                Email sent! Redirecting in {countdown} second
                {countdown !== 1 ? 's' : ''}.{' '}
                <button
                  type="button"
                  className="underline text-blue-600"
                  onClick={() => router.push('/')}
                >
                  Click here
                </button>
              </p>
            )}
          </form>
        </div>
      </div> */}
        <div className="min-h-[75vh] flex items-center justify-center bg-gray-50">
            <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-semibold mb-8 text-center">
                Create Test User
                </h2>
                <form onSubmit={handleCreateUser} className="space-y-6">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full py-4 px-5 text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || emailSent}
                    required
                />
                <button
                    type="submit"
                    disabled={loading || emailSent}
                    className="btn btn-primary w-full py-4 text-base"
                >
                    {loading ? 'Creating...' : 'Create Test User'}
                </button>
                {error && (
                    <p className="text-red-600 text-center mt-2">{error}</p>
                )}
                {emailSent && (
                    <p className="text-green-700 text-center mt-2">
                    Email sent! Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}.{' '}
                    <button
                        type="button"
                        className="underline text-blue-600"
                        onClick={() => router.push('/')}
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
