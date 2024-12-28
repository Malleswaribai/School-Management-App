import React, { createContext, useState, useContext } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
  const [user, setUser] = useState(null); // User details

  // Login function
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost/logout", { credentials: "include" });
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
