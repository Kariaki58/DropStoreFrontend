import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../session/authentication/sessionAuth';

const ProtectedRoute = ({ children }) => {
  const { isSessionAuthenticated, setIsSessionAuthenticated } = useAuth();
  

  // After loading, check if the user is authenticated
  if (!isSessionAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/api/auth/login" />;
  }

  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;
