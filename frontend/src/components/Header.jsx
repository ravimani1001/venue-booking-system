import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  // Conditional dashboard path
  const dashboardLink = user?.role === 'admin' ? '/admin/dashboard' : '/dashboard';

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-primary">
          Eventra
        </Link>

        {/* <nav className="space-x-6 hidden md:flex items-center"> 
          {user?.role === 'admin' && (
            <>
              <Link to={dashboardLink} className="text-darkText hover:text-primary">
                Dashboard
              </Link>
              <Link to="/admin/venues" className="text-darkText hover:text-primary">
                My Venues
              </Link>
              <Link to="/admin/bookings" className="text-darkText hover:text-primary">
                Venue Bookings
              </Link>

              
            </>
          )}
        </nav> */}

        <nav className=" space-x-6 hidden md:flex items-center">
          {/* Public or role-aware nav links */}
          {!user && (
            <>
              {/* <Link to="/" className="text-darkText hover:text-primary">
                Home
              </Link> */}
              <Link to="/venues" className="text-darkText hover:text-primary">
                Venues
              </Link>
              <Link to="/auth" className="text-darkText hover:text-primary">
                Login
              </Link>
            </>
          )}

          {user?.role === 'user' && (
            <>
              <Link to={dashboardLink} className="text-darkText hover:text-primary">
                Dashboard
              </Link>
              <Link to="/venues" className="text-darkText hover:text-primary">
                Venues
              </Link>
              <Link to="/my-bookings" className="text-darkText hover:text-primary">
                My Bookings
              </Link>
              <button
                onClick={logout}
                className="text-darkText hover:text-primary"
              >
                Logout
              </button>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              
                
              <Link to={dashboardLink} className="text-darkText hover:text-primary">
                Dashboard
              </Link>
              <Link to="/admin/venues" className="text-darkText hover:text-primary">
                My Venues
              </Link>
              <Link to="/admin/bookings" className="text-darkText hover:text-primary">
                Venue Bookings
              </Link>
              
              
              
              {/* User features for admin */}
              <Link to="/venues" className="text-darkText hover:text-primary">Browse Venues</Link>
              <Link to="/my-bookings" className="text-darkText hover:text-primary">My Bookings</Link>

              <button
                onClick={logout}
                className="text-darkText hover:text-primary"
              >
                Logout
              </button>
              
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
