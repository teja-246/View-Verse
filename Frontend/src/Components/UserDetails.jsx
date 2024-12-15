import React, { useState } from 'react';
import { User as Userimg } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const UserDetails = () => {
  const [showHoverCard, setShowHoverCard] = useState(false);

  // Mock user data (replace with actual user data)
  const user = {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/api/placeholder/64/64"
  };

  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log("Navigating to user details page");
    navigate("/getUserDetails")
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
        <Userimg className="w-6 h-6 text-gray-400" />
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
                <span className="text-gray-100 font-medium">{user.fullName}</span>
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