// components/Layout/Layout.js
import Header from './Header';
import AdminHeader from './AdminHeader';
import ForgotPasswordHeader from './ForgotPasswordHeader';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  const path = router.pathname;
  const isLoginPage = path === '/';
  const isForgotPasswordPage = path === '/forgot-password';
  const isTestUserPage = path === '/test-user';

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsAdmin(username && /^admin\d{3}$/.test(username));
  }, []);

  let HeaderComponent = null;
  if (!isLoginPage) {
    if (isForgotPasswordPage) {
      HeaderComponent = <ForgotPasswordHeader />;
    } 
    else if(isTestUserPage) {
      HeaderComponent = <ForgotPasswordHeader />;
    }
    else {
      HeaderComponent = isAdmin ? <AdminHeader /> : <Header />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {HeaderComponent}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
