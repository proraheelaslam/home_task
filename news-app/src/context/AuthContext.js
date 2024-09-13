// AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && token) {
          setUser({ ...parsedUser, token });
        }
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (userData) => {
    if (userData?.token) {
      localStorage.setItem('token', userData.token); // Store token directly
      localStorage.setItem('user', JSON.stringify({ name: userData.name }));
      setUser({ name: userData.name, token: userData.token });
      navigate('/');
    }
  };
  

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
