import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const Url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`${Url}/playlists`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        if (data.success) {
          setPlaylists(data.data);
        } else {
          console.error("Failed to fetch playlists:", data.message);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
      setLoading(false);
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = async (id) => {
    navigate(`/playlists/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Your Playlists</h2>

      {loading ? (
        <p className="text-gray-400">Loading playlists...</p>
      ) : playlists.length === 0 ? (
        <p className="text-gray-400">No playlists found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="w-[120px] h-[120px] bg-gray-800 rounded-lg flex items-center justify-center shadow-md cursor-pointer text-center p-2 font-semibold text-sm hover:scale-105 hover:shadow-lg hover:bg-gray-700 transition"
              onClick={() => handlePlaylistClick(playlist._id)}

            >
              {playlist.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
