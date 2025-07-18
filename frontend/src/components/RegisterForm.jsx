import React from 'react';

const RegisterForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-darkText">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-darkText">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Create a password"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-darkText">Role</label>
        <select
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
