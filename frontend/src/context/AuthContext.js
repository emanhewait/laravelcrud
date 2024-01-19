import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, userData);
      const { data } = response;
      setUser(data.data);
      localStorage.setItem('access_token', data.access_token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
