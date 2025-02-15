import React from "react";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";


const VideoGrid = () => {
  
  const [videos, setvideos] = useState([]);

  const Url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${Url}/get-videos`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setvideos(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {videos.map((video) => (
        <VideoCard key={video._id} videoId={video._id} thumbnail = {video.thumbnail} title = {video.title} username = {video.owner.username} avatar = {video.owner.avatar} videoFile = {video.videoFile}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
