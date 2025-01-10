import React from 'react'
import VideoCard from './VideoCard'

const VideoGrid = () => {
    const videos = [
      {
        thumbnail: "/api/placeholder/320/180",
        title: "Understanding React Hooks in 2024 - Complete Guide",
        channel: "TechMaster",
        views: "120K",
        timestamp: "2 days ago",
      },
      {
        thumbnail: "/api/placeholder/320/180",
        title: "The Future of AI - What to Expect in the Next Decade",
        channel: "FutureTech",
        views: "89K",
        timestamp: "1 week ago",
      },
      {
        thumbnail: "/api/placeholder/320/180",
        title: "Urban Photography Tips & Tricks",
        channel: "PixelPro",
        views: "45K",
        timestamp: "3 days ago",
      },
      {
        thumbnail: "/api/placeholder/320/180",
        title: "Easy Vegan Recipes for Beginners",
        channel: "VeganChef",
        views: "67K",
        timestamp: "5 days ago",
      },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    );
  };

export default VideoGrid
