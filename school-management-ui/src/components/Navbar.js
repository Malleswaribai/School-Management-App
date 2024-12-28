import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Correct import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Correctly access 'logout' from context
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout(); // Log out the user using the correct logout function
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">XYZ School</h1>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={handleToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              ☰
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
