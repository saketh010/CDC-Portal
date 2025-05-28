// pages/_app.js
import '../styles/globals.css';
import '../styles/custom.css'; // Import your custom styles
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
     { pageProps.loginForm ? 
      <Component {...pageProps} /> 
        : 
      <Layout><Component {...pageProps} /></Layout>}
    </>

  );
}

export default MyApp;
