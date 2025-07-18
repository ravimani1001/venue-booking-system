import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import heroImage from "../assets/hero.jpg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4 bg-center bg-cover " style={{ backgroundImage: `url(${heroImage})` }}>
      <div className=" p-8 rounded-xl shadow-md w-full max-w-md backdrop-blur-3xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-darkText">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-6 text-center">
          {isLogin ? (
            <p className="text-sm text-lightText">
              New here?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-primary font-medium hover:underline"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p className="text-sm text-lightText">
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-primary font-medium hover:underline"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
