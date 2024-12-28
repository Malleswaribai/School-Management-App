import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" replace />;
  }

  // Render the protected content (e.g., dashboard) if logged in
  return <Outlet />;
};

export default ProtectedRoute;
