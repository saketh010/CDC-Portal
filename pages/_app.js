// pages/_app.js
import '../styles/globals.css';
import '../styles/custom.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
