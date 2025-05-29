// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/';

  useEffect(() => {
    const username = localStorage.getItem('username');
    const isAdmin = username && /^admin\d{3}$/.test(username);
    const path = router.pathname;

    // Redirect admin to admin dashboard if trying to access student routes
    if (isAdmin && path === '/home') {
      router.push('/admin/dashboard');
    }

    // Redirect students away from admin routes
    if (!isAdmin && path.startsWith('/admin')) {
      router.push('/home');
    }
  }, [router.pathname]);

  if (isLoginPage) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
