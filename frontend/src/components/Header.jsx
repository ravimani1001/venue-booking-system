// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-primary">Eventra</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="text-darkText hover:text-primary">Home</a>
          <a href="#" className="text-darkText hover:text-primary">Venues</a>
          <a href="#" className="text-darkText hover:text-primary">Bookings</a>
          <a href="/auth" className="text-darkText hover:text-primary">Login</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
