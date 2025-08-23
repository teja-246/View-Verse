import React, { useState } from "react";

const Url = import.meta.env.VITE_API_URL;

const AIContentGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [aiTitle, setAiTitle] = useState("");
  const [aiDescription, setAiDescription] = useState("");
  const [aiVideoUrl, setAiVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleGenerateContent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${Url}/generate-content`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to generate content");
      }

      setAiTitle(res.title);
      setAiDescription(res.description);
      setAiVideoUrl(res.videoUrl);

      const videoResponse = await fetch(res.videoUrl);
      const blob = await videoResponse.blob();
      const videoFile = new File([blob], "ai-video.mp4", { type: "video/mp4" });
      setVideo(videoFile);
    } catch (err) {
      alert("Failed to generate visualization");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!video) {
      alert("No video to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", aiTitle);
    formData.append("description", aiDescription);
    formData.append("videoFile", video);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const response = await fetch(`${Url}/upload-video`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Video uploaded successfully!");
        setInputText("");
        setAiTitle("");
        setAiDescription("");
        setAiVideoUrl("");
        setVideo(null);
        setThumbnail(null);
      } else {
        alert(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>

        <form onSubmit={handleGenerateContent}>
          <textarea
            rows="5"
            placeholder="Enter your text prompt here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-[rgba(211,255,97,1)] cursor-not-allowed"
                : "bg-[rgba(211,255,97,1)] hover:bg-[rgba(211,255,97,0.8)]"
            } text-black font-bold py-2 px-4 rounded-md`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {/* Show AI Generated Result */}
        {aiTitle && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md border border-gray-600 space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Title:</h3>
              <p>{aiTitle}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Description:</h3>
              <p>{aiDescription}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Video Preview:</h3>
              <video controls className="w-full rounded-md">
                <source src={aiVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Thumbnail upload (optional) */}
            <div className="mt-4">
              <label className="block font-semibold mb-1">
                Upload Thumbnail (optional):
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="text-sm"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIContentGenerator;
