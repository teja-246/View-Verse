import React from "react";
import { useNavigate } from "react-router-dom";


const LogoutButton = () => {
    const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include", // Include cookies with the request
      });

      if (response.ok) {
        // alert("You have successfully logged out.");
        navigate("/login");
      } 
      else {
        // alert("Logout failed. Please try again.");
        navigate("/login");
      }
    } 
    catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
    >
      Logout
    </button>
  );
};

export default LogoutButton;