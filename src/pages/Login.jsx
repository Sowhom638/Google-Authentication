import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    try {
      // credentialResponse.credential is the Google ID token
      await api.post('/auth/google');
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}>
        <h1 style={{ marginBottom: '24px' }}>Welcome</h1>

        {/* This renders the official Google button — no popup, no COOP issue */}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert('Google login failed')}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
        />
      </div>
    </div>
  );
}