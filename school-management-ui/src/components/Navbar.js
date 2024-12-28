import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth(); // Access 'user' from context to determine role
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const renderLinks = () => {
    if (!isLoggedIn || !user) return null;

    // Links for both roles
    const commonLinks = (
      <>
        <a
          href="/"
          className="text-white hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          Home
        </a>
        <a
          href="/profile"
          className="text-white hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          Profile
        </a>
      </>
    );
    if (user.role === "teacher") {
      return (
        <>
          {commonLinks}
          <a
            href="/classroom-details"
            className="text-white hover:bg-blue-700 py-2 px-4 rounded-md"
          >
            Classroom Details
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      );
    }

    if (user.role === 'student') {
      return (
        <>
          {commonLinks}
          <a
            href="/pay-fees"
            className="text-white hover:bg-blue-700 py-2 px-4 rounded-md"
          >
            Pay Fees
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      );
    }

    if (user.role === "admin") {
      return (
        <></>
      )
    }
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
            {renderLinks()}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 py-3 space-y-2">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
