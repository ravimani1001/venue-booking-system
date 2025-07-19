import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user?.role === role ? children : <Navigate to="/" />;
};

export default RoleRoute;
