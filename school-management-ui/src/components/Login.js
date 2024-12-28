import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import the useAuth hook

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Get the login function from context
  const { login } = useAuth();  // Use the login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { userName, password };

    try {
      const response = await fetch("http://localhost/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include", // Ensure cookies are sent
      });

      const data = await response.json();

      if (data.success) {
        login(data.user); // Use the login function to set the user and login state
        navigate("/"); // Redirect to dashboard
      } else if (data.userNotFound) {
        alert("User does not exist.");
      } else {
        alert("Invalid password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Login to XYZ School
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-gray-700 font-medium">
              Username
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
