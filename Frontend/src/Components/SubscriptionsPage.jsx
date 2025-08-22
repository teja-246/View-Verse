import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubscriptionsPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const Url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${Url}/get-subscriptions`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.success) {
          setChannels(result.data); 
        } else {
          console.error("Failed to fetch subscriptions:", result.message);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleChannelClick = (channelId) => {
    navigate(`/channel/${channelId}`);
  };

  if (loading) return <p className="text-center mt-10">Loading subscriptions...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Subscriptions</h1>
      {channels.length === 0 ? (
        <p>You haven’t subscribed to any channels yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((sub) => (
            <div
              key={sub._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => handleChannelClick(sub.channel._id)}
            >
              <h2 className="text-lg font-semibold mb-2">
                {sub.channel.username}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {sub.channel.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;
