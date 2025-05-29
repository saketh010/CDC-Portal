// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/';

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
