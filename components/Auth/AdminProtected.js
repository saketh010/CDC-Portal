import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AdminProtected = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const username = localStorage.getItem('username');
      // Check if username follows admin pattern
      const isAdmin = username && /^admin\d{3}$/.test(username);
      
      if (!isAdmin) {
        setAuthorized(false);
        router.push({
          pathname: '/unauthorized',
          query: { returnUrl: router.asPath }
        });
      } else {
        setAuthorized(true);
      }
    };

    checkAuth();
  }, [router]);

  return authorized ? children : null;
};

export default AdminProtected;