import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PlaylistVideos = () => {
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const Url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const response = await fetch(
              `${Url}/playlists/${playlistId}`,
              {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
              }
            );
            const result = await response.json();
            if (result.success) {
              setVideos(result.data); // Extracting the array from "data"
            } else {
              console.error("Failed to fetch videos:", result.message);
            }
          } 
          catch (error) {
            console.error("Error fetching videos:", error);
          } 
          finally {
            setLoading(false);
          }
    };

    fetchVideos();
  }, [playlistId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Playlist Videos</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-40 bg-gray-700 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.504-3.752A1 1 0 007 8v8a1 1 0 001.248.96l6.504-3.752a1 1 0 000-1.792z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{video.title}</h2>
                <p className="text-sm text-gray-400">{video.owner}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistVideos;