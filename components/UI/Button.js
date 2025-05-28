// components/UI/Button.js
import styles from '../../styles/UI.module.css';

export default function Button({ children, onClick, type = 'button', ...props }) {
  return (
    <button className={styles.button} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}
