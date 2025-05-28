// components/Layout/Layout.js
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const router = useRouter();
  
  // Check if the current page is the login page
  const isLoginPage = router.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Render Header and Footer only if not on login page */}
      {!isLoginPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isLoginPage && <Footer />}
    </div>
  );
}
