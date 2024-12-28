import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn,user,  loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Display a loading spinner or message
  }
  if(user.role ==="admin") {
    alert("Admin can't access this route/n navigate to /admin");
    return <Navigate to = "/admin"/>
  }
  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
