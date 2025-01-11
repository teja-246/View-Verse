import React from 'react'
import {
    Search,
    Menu,
    Upload,
  } from "lucide-react";
import { Link } from "react-router-dom";
import UserDetails from "./UserDetails";
import LogoutButton from "./Logout";


const Navbar = ({ toggleSidebar }) => {
    return (
      <nav className="sticky top-0 bg-slate-900 text-white p-4 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Menu
              className="h-6 w-6 cursor-pointer hover:text-blue-500 transition-colors"
              onClick={toggleSidebar}
            />
            <Link to="/about">
              <h1 className="text-2xl font-bold">ViewVerse</h1>
            </Link>
          </div>
  
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full bg-slate-800 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
  
          <div className="flex items-center gap-6">
            <Link to="/upload-video">
              <Upload className="h-6 w-6 cursor-pointer hover:text-blue-500 transition-colors hidden sm:block" />
            </Link>
            <UserDetails />
            <LogoutButton />
          </div>
        </div>
      </nav>
    );
  };

export default Navbar




