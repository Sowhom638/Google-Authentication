import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    api.get('/auth/me')
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  return authed ? children : <Navigate to="/login" replace />;
}