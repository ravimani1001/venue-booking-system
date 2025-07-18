// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-6 mt-12">
      <div className="container text-center text-sm text-lightText">
        © {new Date().getFullYear()} Eventra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
