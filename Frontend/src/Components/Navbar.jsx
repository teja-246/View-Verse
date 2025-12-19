import React, { useState, useEffect } from 'react'
import {
    Search,
    Menu,
    Upload,
  } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import LogoutButton from "./Logout";


const Navbar = ({ toggleSidebar }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const Url = import.meta.env.VITE_API_URL;

    useEffect(() => {
      const delayDebounceFn = setTimeout(async () => {
        if (searchQuery.trim()) {
          try {
            const response = await fetch(`${Url}/search-videos?query=${searchQuery}`);
            const data = await response.json();
            setSuggestions(data.data || []);
            setShowSuggestions(true);
          } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
          }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, Url]);

    const handleSearch = () => {
        if(searchQuery.trim()){
            setShowSuggestions(false);
            navigate(`/search/${searchQuery}`);
        }
    }

    const handleSuggestionClick = (title) => {
        setSearchQuery(title);
        setShowSuggestions(false);
        navigate(`/search/${title}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
    };

    return (
      <nav className="sticky top-0 bg-black text-white p-4 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Menu
              className="h-6 w-6 cursor-pointer hover:text-blue-500 transition-colors"
              onClick={toggleSidebar}
            />
            <Link to="/main">
            <span className="flex items-center justify-center space-x-2 mb-4">
              <h1 className="text-3xl text-[rgba(211,255,97,1)] font-bold">View</h1>
              <h1 className="text-3xl text-white font-bold">Verse</h1>
              </span>
            </Link>
          </div>
  
          <div className="flex-1 max-w-2xl mx-8 hidden text-white md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => { if(searchQuery.trim()) setShowSuggestions(true); }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
                className="w-full bg-slate-900 border-white border-[1px] rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white text-white"
              />
              <Search 
                className="absolute left-3 top-2.5 h-5 w-5 text-white cursor-pointer" 
                onClick={handleSearch}
              />
              {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-slate-800 border border-slate-700 rounded-lg mt-1 max-h-60 overflow-y-auto z-50 shadow-lg">
                      {suggestions.map((video) => (
                          <li 
                              key={video._id}
                              onClick={() => handleSuggestionClick(video.title)}
                              className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-white flex items-center gap-2"
                          >
                            <Search className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{video.title}</span>
                          </li>
                      ))}
                  </ul>
              )}
            </div>
          </div>
  
          <div className="flex items-center gap-6">
            <Link to="/ai-generate">
            <div className="p-2 rounded-2xl bg-[rgba(211,255,97,1)] text-black cursor-pointerhover:bg-[#e7ffa9] transition-colors hidden sm:block">AI Generate</div>
            </Link>

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




