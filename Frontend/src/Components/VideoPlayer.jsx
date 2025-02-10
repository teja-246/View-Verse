import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import VideoGrid from "./VideoGrid";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import ShareButton from "./ShareButton";
import ButtonShare from "./button_share";

const VideoPlayer = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [video, setVideo] = useState();
  const location = useLocation();

  const Url = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `${Url}/get-required-video/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setVideo(data.data);
      } catch (error) {
        console.log("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [location]);

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
  return (
    <div className="min-h-screen bg-slate-950 min-w-full">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex pt-4">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="w-full lg:ml-64 transition-all duration-300">
          {/* <VideoPlayer /> */}
          <div className="bg-slate-950 mx-auto px-4 py-2 mr-7">
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="relative pb-[56.25%] bg-black">
                {showThumbnail ? (
                  <img
                    src={video?.thumbnail || defaultVideo.thumbnail}
                    alt="Video thumbnail"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={video?.videoFile || defaultVideo.videoFile}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>

              <div className="p-4">
                <h1 className="text-2xl font-bold text-white mb-4">
                  {video?.title || defaultVideo.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-lg">T</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {video?.owner.username || defaultVideo.channel.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {defaultVideo.channel.subscribers}
                      </p>
                    </div>
                    <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium hover:bg-gray-200">
                      Subscribe
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-800 rounded-full">
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-l-full ${
                          isLiked ? "text-blue-500" : "text-white"
                        }`}
                        onClick={() => {
                          setIsLiked(!isLiked);
                          setIsDisliked(false);
                        }}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span>Like</span>
                      </button>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-r-full border-l border-slate-700 ${
                          isDisliked ? "text-blue-500" : "text-white"
                        }`}
                        onClick={() => {
                          setIsDisliked(!isDisliked);
                          setIsLiked(false);
                        }}
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
              <div className="w-full lg:ml-64 transition-all duration-300">
                <h2 className="text-white text-xl font-semibold px-6 mt-6">
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
