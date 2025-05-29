import Footer from './Footer';

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar bg-base-100">
            <div className="flex-1">
              <a href='/home' className="btn btn-ghost text-xl">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://i.pinimg.com/736x/90/61/44/906144b6d22dfbf049d892f62d94a705.jpg" />
                  </div>
                </div>
                <span className="hidden md:inline">Career Development Cell - SVNIT</span>
                <span className="md:hidden">CDC-SVNIT</span>
              </a>
            </div>
          </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}