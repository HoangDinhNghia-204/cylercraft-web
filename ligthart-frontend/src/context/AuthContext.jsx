import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/user`);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user with stored token", error);
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token, API_BASE_URL]);


  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      setUser(response.data.user);
      setToken(response.data.token);
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(`${API_BASE_URL}/logout`);
      }
    } catch (error) {
      console.error("Logout failed on server, logging out on client.", error);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  const loginAfterRegister = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const authContextValue = {
    user,
    token,
    isLoggedIn: !!user,
    isAdmin: user?.is_admin === 1,
    loading,
    login,
    logout,
    loginAfterRegister,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};