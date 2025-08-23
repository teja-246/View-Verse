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


  if (loading) return <p className="text-center mt-10">Loading subscriptions...</p>;

  return (
    <div className="p-6 bg-black min-h-screen">
  <h1 className="text-2xl font-bold mb-6 text-white">Your Subscriptions</h1>

  {channels.length === 0 ? (
    <p className="text-gray-400">You haven’t subscribed to any channels yet.</p>
  ) : (
    <div className="flex flex-wrap gap-6">
      {channels.map((sub) => (
        <div
          key={sub._id}
          className="flex flex-col bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 w-full sm:w-[45%] lg:w-[30%]"
        >
          <h2 className="text-xl text-white font-semibold mb-2">
            {sub.channel.username}
          </h2>
          <p className="text-gray-300 text-sm">
            {sub.channel.fullName}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default SubscriptionsPage;
