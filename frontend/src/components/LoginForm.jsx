import React from 'react';

const LoginForm = () => {
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
          placeholder="Enter your password"
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
