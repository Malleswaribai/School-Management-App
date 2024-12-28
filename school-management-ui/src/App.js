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
import ClassRoomList from "./components/Admin/ClassRoomList";
import StudentsList from "./components/Admin/StudentList";
import TeachersList from "./components/Admin/TeachersList";

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

        <Route path="/admin/class-rooms" element = { <AdminProtectedRoute element={<ClassRoomList/>} /> } />
        <Route path="/admin/students" element = { <AdminProtectedRoute element={<StudentsList/>} /> } />
        <Route path="/admin/teachers" element = { <AdminProtectedRoute element={<TeachersList/>} /> } />

      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
