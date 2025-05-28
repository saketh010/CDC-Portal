import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!username || !isAdmin) {
      router.push('/login');
    }
  }, []);

  return children;
};

export default AdminRoute;