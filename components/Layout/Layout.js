// components/Layout/Layout.js
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
