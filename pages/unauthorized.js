import { useRouter } from 'next/router';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page. This area is restricted to administrators only.
        </p>
        <button
          onClick={() => router.push('/home')}
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}