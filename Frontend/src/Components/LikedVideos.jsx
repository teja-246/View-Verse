import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LikedVideos() {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const Url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await fetch(`${Url}/liked-videos`, {
          credentials: "include",
        });
        const data = await res.json();
        setLikedVideos(data.data || []);
      } catch (error) {
        console.error("Error fetching liked videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, []);

  const navigate = useNavigate();
  const handleVideoClick = (videoId) => {
    navigate(`/get-required-video/${videoId}`);
  };

  if (loading) {
    return <p className="p-6 text-lg text-gray-300">Loading liked videos...</p>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>

      {likedVideos.length === 0 ? (
        <p className="text-gray-400">You haven’t liked any videos yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {likedVideos.map((like) => (
            <div
              key={like._id}
              className="bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition w-72"
              onClick={() => handleVideoClick(like.video?._id)}
            >
              <img
                src={like.video?.thumbnail}
                alt={like.video?.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2 text-white">
                  {like.video?.title}
                </h2>
                <p className="text-sm text-gray-400">{like.video?.description} Description</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
