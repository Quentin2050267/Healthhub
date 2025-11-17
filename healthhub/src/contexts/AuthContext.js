import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

/**
 * AuthProvider component
 * This component provides authentication context to its children.
 * It manages user login, logout, and state persistence.
 * @param {object} children - The child components to render within the provider.
 */
export const AuthProvider = ({ children }) => {
  const port = process.env.REACT_APP_PORT;
  const backendUrl = `http://localhost:${port}/login-google`;

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  /**
   * login function
   * Logs in the user by decoding the JWT token and storing the user data.
   * @param {object} userData - The user data containing the JWT token.
   */
  const login = (userData) => {
    localStorage.removeItem('user');
    if (!userData.credential) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return;
    }
    const decoded = jwtDecode(userData.credential);

    axios.post(backendUrl, decoded).then((response) => {
      setUser(decoded);
      localStorage.setItem('user', JSON.stringify(decoded));
    });
  };

  /**
   * logout function
   * Logs out the user by clearing the user data from state and local storage.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth hook
 * Custom hook to use the AuthContext.
 * @returns {object} - The authentication context value.
 */
export const useAuth = () => useContext(AuthContext);