import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setContact] = useState("");
  const [role, setRole] = useState(""); // Single field for either "Student" or "Teacher"
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // Ensure a role is selected
    if (!role) {
      setError("Please select either Student or Teacher.");
      return;
    }
  
    // Clear error if validation passes
    setError("");
  
    // Construct the registration object
    const registrationData = {
      name,
      dob,
      userName,
      password,
      gender,
      phone,
      isStudent: role === "Student",
      isTeacher: role === "Teacher",
    };
  
    try {
      // Make the POST request
      const response = await fetch("http://localhost/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register.");
      }
  
      // Parse the response (if needed)
      const result = await response.json();
      console.log("Registration Success:", result);
  
      // Notify user
      alert("Form submitted successfully!");
  
      // Optionally, redirect to another page (e.g., login)
      // window.location.href = "/login";
  
    } catch (error) {
      // Handle errors
      console.error("Registration Error:", error);
      setError(error.message || "An error occurred during registration.");
    }
  };
  

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Register</h2>
        <form onSubmit={handleRegister}>
          {/* Name */}
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />

          {/* Date of Birth */}
          <label className="block mt-4 text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />

          {/* Username */}
          <label className="block mt-4 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />

          {/* Password */}
          <label className="block mt-4 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />

          {/* Confirm Password */}
          <label className="block mt-4 text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />

          {/* Gender */}
          <label className="block mt-4 text-sm font-medium text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Contact Details */}
          <label className="block mt-4 text-sm font-medium text-gray-700">Contact Details</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />

          {/* Role Selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Register as</label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="role"
                value="Student"
                checked={role === "Student"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Student</span>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="role"
                value="Teacher"
                checked={role === "Teacher"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Teacher</span>
            </div>
            {/* Error for role */}
            {error === "Please select either Student or Teacher." && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700"
          >
            Register
          </button>

          {/* Show error for confirm password */}
          {error !== "Please select either Student or Teacher." && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
