// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Directly access localStorage to check user data
  const userFromLocalStorage = localStorage.getItem('user');
  let user = null;

  if (userFromLocalStorage) {
    try {
      user = JSON.parse(userFromLocalStorage);
    } catch (e) {
      console.error("Error parsing user data from localStorage:", e);
      localStorage.removeItem('user');
    }
  }

  console.log('User from localStorage:', user); // Log user data

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
