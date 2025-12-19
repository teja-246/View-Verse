import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./input.css";
import "./input.css";
import App from "./App.jsx";
import Navbar from "./Components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import AuthPage from "./Components/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Components/About.jsx";
import Login from "./Components/Login.jsx";
import GetuserDetails from "./Components/GetuserDetails.jsx";
import VideoUploadPage from "./Components/Upload-Video.jsx";
import { Video } from "lucide-react";
import VideoPlayer from "./Components/VideoPlayer.jsx";
import PlaylistsPage from "./Components/PlaylistsPage.jsx";
import PlaylistVideos from "./Components/PlaylistVideos.jsx";
import AIContentGenerator from "./Components/AIContentGenerator.jsx";
import WatchLater from "./Components/WatchLater.jsx";
import SubscriptionsPage from "./Components/SubscriptionsPage.jsx";
import LikedVideos from "./Components/LikedVideos.jsx";
import SearchResults from "./Components/SearchResults.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/main",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/playlists",
    element: <PlaylistsPage />,
  },
  {
    path: "/playlists/:id",
    element: <PlaylistVideos />,
  },
  {
    path: "/getUserDetails",
    element: <GetuserDetails />,
  },
  {
    path: "/upload-video",
    element: <VideoUploadPage />,
  },
  {
    path: "/get-required-video/:id",
    element: <VideoPlayer />,
  },
  {
    path: "/ai-generate",
    element: <AIContentGenerator />,
  },
  {
    path: "/watchlater",
    element: <WatchLater />,
  },
  {
    path: "/subscriptions",
    element: <SubscriptionsPage />,
  },
  {
    element: <LikedVideos />,
  },
  {
    path: "/search/:query",
    element: (
        <div className="min-h-screen bg-slate-950 min-w-full">
            <Navbar />
            <div className="flex pt-4">
                <Sidebar />
                <main className="w-full lg:ml-64 transition-all duration-300">
                    <SearchResults />
                </main>
            </div>
        </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
