import React, { useState, useEffect } from "react";
import { User as Userimg } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [showHoverCard, setShowHoverCard] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log("Current cookies:", document.cookie);

        const response = await fetch(
          "https://view-verse.onrender.com/api/v1/users/current-user",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Log the full response for debugging
        // console.log("Full response:", response);

        if (!response.ok) {
          const errorData = await response.text();
          console.log("Error response body:", errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.data) {
          setUser(result.data);
        }
        // console.log("Success response:", result);
      } catch (error) {
        console.error("Error fetching user data:", error);
        const defaultUser = { fullName: "Guest User", email: "Login to view details" };
        setUser(defaultUser);
      }
    };

    fetchUser();
  }, []);

  const handleCardClick = () => {
    // console.log("Navigating to user details page");
    navigate("/getUserDetails");
  };

  return (
    <div className="relative inline-block">
      {/* Main clickable div */}
      <div
        className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
        onMouseEnter={() => setShowHoverCard(true)}
        onMouseLeave={() => setShowHoverCard(false)}
        onClick={handleCardClick}
      >
        <Userimg className="w-6 h-6 text-white" />
      </div>

      {/* Hover card */}
      {showHoverCard && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-gray-100 font-medium">
                  {user.fullName}
                </span>
                <span className="text-gray-400 text-sm">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
