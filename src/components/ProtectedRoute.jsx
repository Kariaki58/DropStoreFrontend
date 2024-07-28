import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../session/authentication/sessionAuth';

// user protected route
const ProtectedRoute = ({ children }) => {
  const { isSessionAuthenticated } = useAuth();
  
  
  if (!isSessionAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/api/auth/login" />;
  }

  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;
