import { useState, useEffect } from "react";

const PlaylistActionButton = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchPlaylists();
    }
  }, [isOpen]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/playlists", {
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

  const addToPlaylist = async (playlistId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/playlists/${playlistId}/add-video`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Video added to playlist!");
        setIsOpen(false);
      } else {
        console.error("Failed to add video:", data.message);
      }
    } catch (error) {
      console.error("Error adding video to playlist:", error);
    }
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/create-playlist", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newPlaylistName, videos: [videoId] }),
      });

      const data = await response.json();
      if (data.success) {
        alert("New playlist created!");
        setIsOpen(false);
        setNewPlaylistName("");
      } else {
        console.error("Failed to create playlist:", data.message);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <>
      {/* Small Button Near Video */}
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        ➕ Playlist
      </button>

      {/* Pop-up Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Manage Playlists</h3>

            {/* Add to Existing Playlist */}
            {loading ? (
              <p className="text-gray-400">Loading playlists...</p>
            ) : playlists.length === 0 ? (
              <p className="text-gray-400">No playlists found.</p>
            ) : (
              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <button
                    key={playlist._id}
                    className="block w-full text-left p-2 bg-gray-800 rounded hover:bg-gray-700 transition"
                    onClick={() => addToPlaylist(playlist._id)}
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            )}

            {/* Create New Playlist */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="New Playlist Name"
                className="w-full p-2 rounded bg-gray-800 text-white outline-none"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                onClick={createPlaylist}
              >
                Create & Add Video
              </button>
            </div>

            {/* Close Button */}
            <button
              className="mt-4 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistActionButton;
