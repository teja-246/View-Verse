import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, Play } from "lucide-react";
import { useParams } from "react-router-dom";
import VideoGrid from "./VideoGrid";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ButtonShare from "./button_share";
import CommentSection from "./CommentSection";
import PlaylistActionButton from "./PlaylistActionButton";

const VideoPlayer = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [video, setVideo] = useState();
  const location = useLocation();

  const Url = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`${Url}/get-required-video/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setVideo(data.data);
      } catch (error) {
        console.log("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [location]);

  // Fetch initial likes count
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(`${Url}/likeCount/${video?._id}`, {
          credentials: "include",
        });
        const data = await response.json();

        setLikesCount(data.data.likesCount);
        setIsLiked(data.data.isLiked);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    if (video?._id) {
      fetchLikeCount();
    }
  }, [video?._id]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch(`${Url}/subscribedOrNot/${video?.owner}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        setIsSubscribed(data.data.subscribed || false);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    if (video?.owner) {
      fetchSubscriptionStatus();
    }
  }, [video?.owner]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThumbnail(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(window.location.href); // Set the current URL after mount
  }, []);

  const defaultVideo = {
    videoFile:
      "http://res.cloudinary.com/duvx8ui7u/video/upload/v1736539671/ynpxll5ea48tgofu1gg1.mp4",
    thumbnail:
      "http://res.cloudinary.com/duvx8ui7u/image/upload/v1736539676/rhq7hclo9ie4zzhlvbih.webp",
    title: "Introducing View Verse",
    channel: {
      name: "The Creator of View Verse",
      subscribers: "Subscribers : Everyone watching this 😉",
    },
    likes: "Hope you like it",
    views: "Views: Lots",
    uploaded: "Uploaded : When you started watching",
    description:
      "View verse is a seamless video streaming platform. Upload and stream videos effortlessly...",
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLikeToggle = async () => {
    try {
      const res = await fetch(`${Url}/likeVideo/${video._id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      setIsDisliked(false);
      setIsLiked(data.data.liked);
      setLikesCount(data.data.likesCount);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDislikeToggle = async () => {
    try {
      const res = await fetch(`${Url}/dislikeVideo/${video._id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      setIsDisliked(data.data.disliked);
      setIsLiked(false);
      setLikesCount(data.data.likesCount);
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  const handleSubscribe = async () => {
    console.log("subscribe clicked");
    try {
      const res = await fetch(`${Url}/subscribe/${video._id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      setIsSubscribed(data.data.subscribed);
    } catch (error) {
      console.error("Error subscribing to channel:", error);
    }
  };

  const addToWatchLater = async (videoId) => {
  try {
    await fetch(`${Url}/watchlater/${videoId}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    alert("Added to Watch Later!");
  } catch (err) {
    console.error("Error adding to watch later:", err);
  }
};


  return (
    <div className="min-h-screen bg-slate-950 min-w-full">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex pt-4">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="w-full lg:ml-64 transition-all duration-300">
          {/* <VideoPlayer /> */}
          <div className="bg-black py-2 mr-7">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="p-12 relative pb-[56.25%] bg-black">
                {showThumbnail ? (
                  <img
                    src={video?.thumbnail}
                    alt="Video thumbnail"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={video?.videoFile}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>

              <div className="p-4 bg-black">
                <h1 className="text-2xl font-bold text-white mb-4">
                  {video?.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-lg">T</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {video?.owner.username}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {defaultVideo.channel.subscribers}
                      </p>
                    </div>
                    <button
                      className={`text-slate-900 px-4 py-2 rounded-full font-medium hover:bg-gray-200 ${
                        isSubscribed ? "bg-red-500" : "bg-white"
                      }`}
                      onClick={handleSubscribe}
                    >
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                    <PlaylistActionButton videoId={video?._id} />
                    <button
                      onClick={() => addToWatchLater(video._id)}
                      className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 text-xs"
                    >
                      Watch Later
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-800 rounded-full">
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-l-full ${
                          isLiked ? "text-blue-500" : "text-white"
                        }`}
                        onClick={handleLikeToggle}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span>Like</span>
                        <span>{likesCount}</span>
                      </button>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-r-full border-l border-slate-700 ${
                          isDisliked ? "text-blue-500" : "text-white"
                        }`}
                        onClick={handleDislikeToggle}
                      >
                        <ThumbsDown className="h-5 w-5" />
                        <span>Dislike</span>
                      </button>
                    </div>

                    <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full">
                      {/* <Share2 className="h-5 w-5" />
                      <span>Share</span> */}
                      <ButtonShare shareUrl={shareUrl} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 bg-slate-800 rounded-lg p-4">
                  <div className="text-gray-300 text-sm">
                    <span>
                      <p className="mb-2">{defaultVideo.views}</p>
                      <p className="mb-2">
                        {video?.createdAt || defaultVideo.uploaded}
                      </p>
                    </span>
                    <p>{video?.description || defaultVideo.description}</p>
                  </div>
                </div>
              </div>

              <CommentSection videoId={video?._id} />
              <div className="w-full  transition-all duration-300 bg-black">
                <h2 className="text-white text-xl font-semibold mt-6">
                  Watch more
                </h2>
                <VideoGrid />
              </div>
            </div>
          </div>
          <h2 className="text-white text-xl font-semibold px-6">
            {/* Recommended Videos */}
          </h2>
          <VideoGrid />
        </main>
      </div>
    </div>
  );
};

export default VideoPlayer;
