import React from 'react'
import { useNavigate } from 'react-router-dom';


const VideoCard = ({ videoFile, videoId, thumbnail, title, username, avatar }) => {
  const navigate = useNavigate();

    const handleClick = () => {
      console.log("Video Clicked");
      console.log(title);
      navigate(`/get-required-video/${videoId}`);
    }

    return (
      <div className="bg-slate-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer" onClick={handleClick}>
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
              <img src={avatar} alt="avatar" className='h-8 w-8 rounded-full' />
            </div>
            <div>
              <p className="text-gray-300 text-sm">{username}</p>
              <p className="text-gray-400 text-xs">
                views views · timestamp
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default VideoCard;