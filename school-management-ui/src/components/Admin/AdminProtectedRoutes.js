import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminProtectedRoute = ({ element }) => {
  const { user , loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Display a loading spinner or message
  }

  return user.role === 'admin' ? element : <Navigate to="/login" />;
};

export default AdminProtectedRoute;