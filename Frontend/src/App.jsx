import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import VideoGrid from "./Components/VideoGrid";
import VideoPlayer from "./Components/VideoPlayer";


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
