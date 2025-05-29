import LoginLayout from '../components/Layout/LoginLayout';
import LoginForm from '../components/Auth/LoginForm';
import styles from '../styles/LoginForm.module.css';

export default function LoginPage() {
  return (
    <LoginLayout>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </LoginLayout>
  );
}
