import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

// Create Context
const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, role, email, _id }
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user info on first load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/profile');
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Logout handler
  const logout = async () => {
    await API.post('/auth/logout');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
