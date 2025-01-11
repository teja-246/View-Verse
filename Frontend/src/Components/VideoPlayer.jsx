import React from 'react'
import { useState, useEffect } from "react";
import {
    ThumbsUp,
    ThumbsDown,
    Share2,
  } from "lucide-react";

const VideoPlayer = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowThumbnail(false);
      }, 2000); 
      return () => clearTimeout(timer); 
    }, []);

    const defaultVideo = {
      videoFile: "http://res.cloudinary.com/duvx8ui7u/video/upload/v1736539671/ynpxll5ea48tgofu1gg1.mp4",
      thumbnail : "http://res.cloudinary.com/duvx8ui7u/image/upload/v1736539676/rhq7hclo9ie4zzhlvbih.webp",
      title: "Introducing View Verse",
      channel: {
        name: "The Creator of View Verse",
        subscribers: "Subscribers : Everyone watching this 😉",
      },
      likes: "Hope you like it",
      views: "Views: Lots",
      uploaded: "Uploaded : When you started watching",
      description:
        "View verse is a seamless video streaming platform. Upload and stream videos effortlessly...",
    };

    return (
      <div className="mx-auto px-4 py-6 mr-7">
        <div className="bg-slate-900 rounded-lg overflow-hidden">
        <div className="relative pb-[56.25%] bg-black">
          {showThumbnail ? (
            <img
              src={defaultVideo.thumbnail}
              alt="Video thumbnail"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <video
              src={defaultVideo.videoFile}
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              autoPlay
              loop
            />
          )}
        </div>
  
          <div className="p-4">
            <h1 className="text-2xl font-bold text-white mb-4">
              {defaultVideo.title}
            </h1>
  
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-lg">T</span>
                </div>
                <div>
                  <p className="text-white font-medium">{defaultVideo.channel.name}</p>
                  <p className="text-gray-400 text-sm">{defaultVideo.channel.subscribers}</p>
                </div>
                <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium hover:bg-gray-200">
                  Subscribe
                </button>
              </div>
  
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-800 rounded-full">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-l-full ${
                      isLiked ? "text-blue-500" : "text-white"
                    }`}
                    onClick={() => {
                      setIsLiked(!isLiked);
                      setIsDisliked(false);
                    }}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{defaultVideo.likes}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-r-full border-l border-slate-700 ${
                      isDisliked ? "text-blue-500" : "text-white"
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
                <span>
                <p className="mb-2">{defaultVideo.views}</p>
                <p className="mb-2">{defaultVideo.uploaded}</p>
                </span>
                <p>
                  {defaultVideo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default VideoPlayer
