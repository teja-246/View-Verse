import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  
  const Url = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${Url}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        px-4 py-2 
        bg-gray-800 
        text-white 
        rounded-md 
        cursor-pointer
        transition-all duration-300 ease-in-out
        text-base
        font-sans
        hover:bg-gray-700 
        focus:outline-none focus:ring-3 focus:ring-gray-500 focus:ring-opacity-50
      "
    >
      Logout
    </button>
  );
};

export default LogoutButton;