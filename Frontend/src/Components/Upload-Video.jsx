import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoUploadPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);

    const [aiLoadingTitle, setAiLoadingTitle] = useState(false);
    const [aiLoadingDescription, setAiLoadingDescription] = useState(false);

    const Url = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("videoFile", video);
        formData.append("thumbnail", thumbnail);

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
                setTitle('');
                setDescription('');
                setVideo(null);
                setThumbnail(null);
            } else {
                alert(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Failed to upload video. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAIParse = async (field) => {
        const textToParse = field === 'title' ? title : description;
        if (!textToParse) return alert('Please enter text before parsing!');

        field === 'title' ? setAiLoadingTitle(true) : setAiLoadingDescription(true);

        try {
            const response = await fetch(`${Url}/parse-text`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ text: textToParse })
            });

            const result = await response.json();
            const aiText = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiText) {
                if (field === 'title') setTitle(aiText);
                else setDescription(aiText);
            } else {
                alert("AI parsing failed. Try again!");
            }
        } 
        catch (error) {
            console.error("AI Parsing error:", error);
            alert("AI parsing failed. Please try again.");
        } 
        finally {
            field === 'title' ? setAiLoadingTitle(false) : setAiLoadingDescription(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="title">
                            Title
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => handleAIParse('title')}
                                disabled={aiLoadingTitle}
                                className={`px-3 py-2 rounded-md text-sm ${
                                    aiLoadingTitle ? 'bg-blue-400 cursor-not-allowed' : 'bg-[rgba(211,255,97,1)] hover:bg-[#e7ffa9] transition-colors text-black'
                                }`}
                            >
                                {aiLoadingTitle ? 'Parsing...' : 'AI Parse'}
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="description">
                            Description
                        </label>
                        <div className="flex gap-2">
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => handleAIParse('description')}
                                disabled={aiLoadingDescription}
                                className={`px-3 py-2 rounded-md text-sm ${
                                    aiLoadingDescription ? 'bg-blue-400 cursor-not-allowed' : 'bg-[rgba(211,255,97,1)] hover:bg-[#e7ffa9] transition-colors text-black'
                                }`}
                            >
                                {aiLoadingDescription ? 'Parsing...' : 'AI Parse'}
                            </button>
                        </div>
                    </div>

                    {/* Video */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="video">
                            Video File
                        </label>
                        <input
                            type="file"
                            id="video"
                            onChange={(e) => setVideo(e.target.files[0])}
                            className="w-full text-gray-400 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="video/*"
                            required
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="thumbnail">
                            Thumbnail
                        </label>
                        <input
                            type="file"
                            id="thumbnail"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            className="w-full text-gray-400 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="image/*"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-black ${
                            loading 
                                ? 'bg-blue-400 cursor-not-allowed text-black' 
                                : 'bg-[rgba(211,255,97,1)] hover:bg-[#e7ffa9] transition-colors text-black'
                        } font-bold py-2 px-4 rounded-md`}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VideoUploadPage;
