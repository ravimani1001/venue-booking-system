import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import 'react-datepicker/dist/react-datepicker.css';

import App from './App'; // Landing page
import Auth from './pages/Auth';

import UserDashboard from './pages/user/UserDashboard';
import MyBookings from './pages/user/MyBookings';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVenues from './pages/admin/AdminVenues';
import AdminBookings from './pages/admin/AdminBookings';

import VenueList from './pages/public/VenueList'; // Public route

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute from './routes/RoleRoute';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/venues" element={<VenueList />} /> 

          {/* Private Routes for Any Logged-in User */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />

          {/* 🔐 Admin Role-Only Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/venues"
            element={
              <RoleRoute role="admin">
                <AdminVenues />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <RoleRoute role="admin">
                <AdminBookings />
              </RoleRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
