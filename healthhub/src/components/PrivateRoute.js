import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PrivateRoute component
 * This component checks if the user is authenticated.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is authenticated, it renders the child components.
 * @param {object} children - The child components to render if the user is authenticated.
 */
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;