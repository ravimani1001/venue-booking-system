import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name : '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Update input fields
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1️⃣ Register the user
      await API.post('/auth/signup', formData);

      // 2️⃣ Cookie is set, fetch profile
      const res = await API.get('/auth/profile');
      
      const role  = res.data.role;
      

      // 3️⃣ Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-darkText">Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-darkText">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-darkText">Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-darkText">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
