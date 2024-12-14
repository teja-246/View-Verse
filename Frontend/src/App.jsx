import React, { useState } from 'react';
import { Search, Menu, Upload, ThumbsUp, ThumbsDown, Share2, MessageCircle, X, CloudCog, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';



// Navbar Component
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
          <Upload className="h-6 w-6 cursor-pointer hover:text-blue-500 transition-colors hidden sm:block" />
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer" >
            <span className="text-sm font-medium">T</span>
          </div>
        </div>
      </div>
    </nav>
  );
};


// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { label: 'Home', icon: '🏠' },
    { label: 'Trending', icon: '🔥' },
    { label: 'Subscriptions', icon: '📺' },
    { label: 'Library', icon: '📚' },
    { label: 'History', icon: '⏰' },
    { label: 'Liked Videos', icon: '👍' },
    { label: 'Watch Later', icon: '⏳' }
  ];

  const navigate = useNavigate();

  const handleSidebarElements = (item)=>{
    console.log("sidebar clicked")

    if(item.label === "Home"){
      console.log("Home clicked")
      navigate("/main")
    }
  }

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
      <aside className={`
        w-64 bg-slate-900 text-white h-screen fixed top-16 z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <div className="flex justify-end lg:hidden mb-4">
            <X 
              className="h-6 w-6 cursor-pointer hover:text-blue-500 transition-colors" 
              onClick={toggleSidebar}
            />
          </div>
          {menuItems.map((item, index) => (
            <div onClick={()=>{handleSidebarElements(item)}}
              key={index}
              className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg cursor-pointer mb-1"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

// VideoCard Component remains the same
const VideoCard = ({ thumbnail, title, channel, views, timestamp }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
      <div className="relative pb-[56.25%]">
        <img
          src={thumbnail}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-sm">{channel[0]}</span>
          </div>
          <div>
            <p className="text-gray-300 text-sm">{channel}</p>
            <p className="text-gray-400 text-xs">
              {views} views · {timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// VideoGrid Component remains the same
const VideoGrid = () => {
  const videos = [
    {
      thumbnail: "/api/placeholder/320/180",
      title: "Understanding React Hooks in 2024 - Complete Guide",
      channel: "TechMaster",
      views: "120K",
      timestamp: "2 days ago"
    },
    {
      thumbnail: "/api/placeholder/320/180",
      title: "The Future of AI - What to Expect in the Next Decade",
      channel: "FutureTech",
      views: "89K",
      timestamp: "1 week ago"
    },
    {
      thumbnail: "/api/placeholder/320/180",
      title: "Urban Photography Tips & Tricks",
      channel: "PixelPro",
      views: "45K",
      timestamp: "3 days ago"
    },
    {
      thumbnail: "/api/placeholder/320/180",
      title: "Easy Vegan Recipes for Beginners",
      channel: "VeganChef",
      views: "67K",
      timestamp: "5 days ago"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {videos.map((video, index) => (
        <VideoCard key={index} {...video} />
      ))}
    </div>
  );
};

// VideoPlayer Component remains the same
const VideoPlayer = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <div className="relative pb-[56.25%] bg-black">
          <img
            src="/api/placeholder/1280/720"
            alt="Video thumbnail"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold text-white mb-4">
            Understanding React Hooks in 2024 - Complete Guide
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-4 gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-lg">T</span>
              </div>
              <div>
                <p className="text-white font-medium">TechMaster</p>
                <p className="text-gray-400 text-sm">1.2M subscribers</p>
              </div>
              <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium hover:bg-gray-200">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-slate-800 rounded-full">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-l-full ${
                    isLiked ? 'text-blue-500' : 'text-white'
                  }`}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setIsDisliked(false);
                  }}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>123K</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-r-full border-l border-slate-700 ${
                    isDisliked ? 'text-blue-500' : 'text-white'
                  }`}
                  onClick={() => {
                    setIsDisliked(!isDisliked);
                    setIsLiked(false);
                  }}
                >
                  <ThumbsDown className="h-5 w-5" />
                </button>
              </div>

              <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="mt-4 bg-slate-800 rounded-lg p-4">
            <div className="text-gray-300 text-sm">
              <p className="mb-2">120K views · 2 days ago</p>
              <p>
                In this comprehensive guide, we'll dive deep into React Hooks and
                explore how they've evolved in 2024. Learn best practices,
                performance optimization techniques, and real-world applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex pt-16">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="w-full lg:ml-64 transition-all duration-300">
          <VideoPlayer />
          <h2 className="text-white text-xl font-semibold px-6 mt-6">
            Recommended Videos
          </h2>
          <VideoGrid />
        </main>
      </div>
    </div>
  );
};

export default App;