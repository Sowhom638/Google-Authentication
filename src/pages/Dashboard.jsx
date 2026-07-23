import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    navigate('/login');
  };

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const profileImage = user.picture 
    ? user.picture 
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4285f4&color=fff&size=200`;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: 500,
        margin: '0 auto',
        background: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ marginTop: 0 }}>Dashboard</h1>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src={profileImage}
            alt={user.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${getInitials(user.name)}&background=4285f4&color=fff&size=200`;
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: '3px solid #4285f4',
              objectFit: 'cover',
            }}
          />
          <h2 style={{ margin: '12px 0 4px' }}>{user.name}</h2>
          <p style={{ color: '#666', margin: 0 }}>{user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            background: '#ea4335',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 500,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}