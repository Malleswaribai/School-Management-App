import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Display a loading spinner or message
  }

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
