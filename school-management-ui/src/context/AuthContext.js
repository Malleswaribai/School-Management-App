import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Simulate retrieving user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Authentication check completed
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
