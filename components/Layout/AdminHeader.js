import Link from 'next/link';
import { PiStudentBold } from "react-icons/pi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Logout from '../Auth/Logout';
export default function AdminHeader() {
  return (
    <div className="navbar bg-base-100">
          <div className="flex-1">
            <a href='/admin/listjob' className="btn btn-ghost text-xl">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://i.pinimg.com/736x/90/61/44/906144b6d22dfbf049d892f62d94a705.jpg" />
                </div>
              </div>
              <span className="hidden md:inline">Career Development Cell - SVNIT</span>
              <span className="md:hidden">CDC-SVNIT</span>
            </a>
          </div>
          <div className="flex-none gap-2">
    
            {/* search to be implemented later */}
            {/* <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div> */}
    
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <PiStudentBold size={30} />
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a href='/selections/previousSelections' className="justify-between">Previous Selection
                    <span className="badge"><BsFillBriefcaseFill size={20} /></span>
                  </a>
                </li>
                <li>
                  <Logout>Logout 
                    <span className="badge"></span>
                  </Logout>
                </li>
              </ul>
            </div>
          </div>
        </div>
  );
}