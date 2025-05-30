import Image from 'next/image';
import Link from 'next/link';

const ForgotPasswordHeader = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img 
                src="https://i.pinimg.com/736x/90/61/44/906144b6d22dfbf049d892f62d94a705.jpg" 
                alt="SVNIT Logo"
              />
            </div>
          </div>
          <span className="hidden md:inline">Career Development Cell - SVNIT</span>
          <span className="md:hidden">CDC-SVNIT</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordHeader;