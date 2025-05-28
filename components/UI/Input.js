// components/UI/Input.js
import styles from '../../styles/UI.module.css';

export default function Input({ label, id, type = 'text', ...props }) {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input id={id} type={type} className={styles.input} {...props} />
    </div>
  );
}
