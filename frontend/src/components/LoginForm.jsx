import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1️⃣ Send login request to backend
      const loginRes = await API.post('/auth/login', { email, password });
      console.log("Login Response : ", loginRes)
      // 2️⃣ Cookie is set automatically — now we fetch user info
      const res = await API.get('/auth/profile');
      console.log(res)
      const  role  = res.data.role;
      console.log("Role - ",role)

      // 3️⃣ Redirect based on user role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err);
      await API.post('/auth/logout')
      console.log("Logged Out")
      setError(
        err?.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-darkText">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-darkText">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
