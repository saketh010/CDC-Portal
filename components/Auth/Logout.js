// components/Auth/Logout.js
import { useRouter } from 'next/router';
import { FiLogOut } from "react-icons/fi";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Make a request to clear the token on the backend
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Clear any client-side storage
        localStorage.removeItem('username');

        // Redirect to the login page
        router.push('/');
      } else {
        console.error('Logout failed:', response.statusText);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 font-bold hover:bg-white"
    >
      LogOut
      <span className="badge text-red-500">
        <FiLogOut size={20} />
      </span>
    </button>
  );
}
