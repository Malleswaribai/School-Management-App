import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ClassroomDetails from "./components/ClassroomDetails";
import Profile from "./components/Profile";
import PayFees from "./components/PayFees";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoutes";
import AdminDashboard from "./components/Admin/AdminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navbar />  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/classroom-details" element={<ProtectedRoute element={<ClassroomDetails />} />} />
        <Route path="/pay-fees" element={<ProtectedRoute element={<PayFees />} />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/admin" element={<AdminProtectedRoute element={<AdminDashboard/>}/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
