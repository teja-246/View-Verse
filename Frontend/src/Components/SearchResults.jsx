import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const { query } = useParams();
  const Url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${Url}/search-videos?query=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setVideos(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (query) {
        fetchVideos();
    }
  }, [query, Url]);

  return (
    <div className="w-full">
        <h2 className="text-white text-xl font-semibold px-6 pt-4">
            Search Results for "{query}"
        </h2>
        {videos.length === 0 ? (
             <div className="text-white text-lg px-6 py-4">No videos found.</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {videos.map((video) => (
                    <VideoCard key={video._id} videoId={video._id} thumbnail = {video.thumbnail} title = {video.title} username = {video.owner.username} avatar = {video.owner.avatar} videoFile = {video.videoFile}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

export default SearchResults;
