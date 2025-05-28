// components/Layout/Header.js
import Link from 'next/link';
// import styles from '../../styles/Layout.module.css';
import { FaRegUserCircle } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoFileTrayFull } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Logout from '../Auth/Logout';

//Dharmil code - modified (7-10-24)

// export default function Header() {
//   return (
//     <header className={styles.header}>
//       <div className={styles.logo}>
//         <Link href="/">
//           {/* Replace with your logo image if available */}
//           CDC Portal
//         </Link>
//       </div>
//       <nav>
//         <ul className={styles.navList}>
//           <li>
//             <Link href="/profile">
//               Profile
//             </Link>
//           </li>
//           {/* Add more navigation links as needed */}
//         </ul>
//       </nav>
//     </header>
//   );
// }

//saketh code (updated 7-10-24)
export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href='/home' className="btn btn-ghost text-xl">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src="data:image/jpeg;base64,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" />
            </div>
          </div>
          CDC-SVNIT
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {/* <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              
          </div> */}
            <PiStudentBold size={30} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a href='/profile' className="justify-between">Student Profile
                <span className="badge"><FaRegUserCircle size={20} /></span>
              </a>
            </li>

            

            <li>
              <a href='/myapplications'>My Applications
                <span className="badge"><IoFileTrayFull size={20} /></span>
              </a>
            </li>
            
            <li>
              <a href='/selection'>Previous Selection
                <span className="badge"><BsFillBriefcaseFill  size={20}/></span>
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
  )
}