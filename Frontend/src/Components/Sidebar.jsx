import React from 'react'
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const menuItems = [
      { label: "Home", icon: "🏠" },
      { label: "Trending", icon: "🔥" },
      { label: "Subscriptions", icon: "📺" },
      { label: "Playlists", icon: "📚" },
      { label: "History", icon: "⏰" },
      { label: "Liked Videos", icon: "👍" },
      { label: "Watch Later", icon: "⏳" },
    ];
  
    const navigate = useNavigate();
  
    const handleSidebarElements = (item) => {
      console.log("sidebar clicked");
  
      if (item.label === "Home") {
        console.log("Home clicked");
        navigate("/main");
      }
      if (item.label === "Playlists") {
        console.log("Playlists clicked");
        navigate("/playlists");
      }
      if (item.label === "Watch Later") {
        console.log("Watch Later clicked");
        navigate("/watchlater");
      }
    };
  
    return (
      <>
        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
  
        {/* Sidebar */}
        <aside
          className={`
          w-56 bg-black text-white h-screen fixed top-16 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <div className="p-4">
            <div className="flex justify-end lg:hidden mb-4">
              <X
                className="h-6 w-6 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={toggleSidebar}
              />
            </div>
            {menuItems.map((item, index) => (
              <div
                onClick={() => {
                  handleSidebarElements(item);
                }}
                key={index}
                className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg cursor-pointer mb-1"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </>
    );
  };

export default Sidebar
