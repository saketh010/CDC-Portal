import LoginForm from '../components/Auth/LoginForm';
import styles from '../styles/LoginForm.module.css';

export async function getServerSideProps(context) {
  const { req } = context;

  // Retrieve the token from cookies
  const token = req.cookies?.token;

  // If the token exists, redirect to the dashboard or home page
  if (token) {
    return {
      redirect: {
        destination: '/home', // Replace with your dashboard or authenticated home page
        permanent: false,
      },
    };
  }

  // If no token, allow the login page to render
  return {
    props: {}, // No special props are needed here
  };
}

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
