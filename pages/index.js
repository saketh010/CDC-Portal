import Head from 'next/head';
import LoginLayout from '../components/Layout/LoginLayout';
import LoginForm from '../components/Auth/LoginForm';
import styles from '../styles/LoginForm.module.css';
import PageHead from '../components/SEO/PageHead';

export default function LoginPage() {
  return (
    <>
      <PageHead title="Login" description="Login to the SVNIT Career Portal to browse job opportunities, submit applications, and access your student dashboard." />
      <LoginLayout>
        <div className={styles.container}>
          <LoginForm />
        </div>
      </LoginLayout>
    </>
  );
}
