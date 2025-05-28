// components/Layout/Footer.js
// import styles from '../../styles/Layout.module.css';
//made use of react-icons
import { FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    //dharmil code (modified on 7-10-24)
    // <footer className={styles.footer}>
    //   <p>&copy; {new Date().getFullYear()} CDC Portal. All rights reserved.</p>
    // </footer>

    //saketh's code (updated on 7-10-24)
    <footer className="footer bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        
        <p className="text-lg">Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a className="size-10" target="_blank" href="https://www.linkedin.com/in/career-development-cell-tnp-section-svnit-surat-8711b087/?originalSubdomain=in">
        <FaLinkedin size={30}/>
        </a>
      </nav>
  </footer>
  );
}
