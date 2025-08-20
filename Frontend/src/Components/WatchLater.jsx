import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WatchLater = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const Url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await fetch(`${Url}/watchlater`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.success) {
          setVideos(result.data);
        } else {
          console.error("Failed to fetch watch later videos:", result.message);
        }
      } catch (error) {
        console.error("Error fetching watch later:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchLater();
  }, []);

  const handleVideoClick = (id) => {
    navigate(`/get-required-video/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Watch Later</h2>

      {loading ? (
        <p className="text-gray-400">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-400">No videos in Watch Later.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className="w-[180px] h-[120px] bg-gray-800 rounded-lg flex flex-col items-center justify-center shadow-md cursor-pointer text-center p-2 font-semibold text-sm hover:scale-105 hover:shadow-lg hover:bg-gray-700 transition"
              onClick={() => handleVideoClick(video._id)}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-[80px] object-cover rounded-md mb-2"
              />
              <p className="truncate">{video.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
