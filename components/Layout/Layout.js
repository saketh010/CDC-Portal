// components/Layout/Layout.js
import Header from './Header';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const isLoginPage = router.pathname === '/';

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsAdmin(username && /^admin\d{3}$/.test(username));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && (isAdmin ? <AdminHeader /> : <Header />)}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
