import React from 'react'

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

export default VideoCard
