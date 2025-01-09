import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoUploadPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Video uploaded successfully!');
        navigate('/'); // Redirect to the main page or another route after submission
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
                        <input
                            type="text"
                            id="title"
                            className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="video">
                            Video File
                        </label>
                        <input
                            type="file"
                            id="video"
                            className="w-full text-gray-400 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="video/*"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="thumbnail">
                            Thumbnail
                        </label>
                        <input
                            type="file"
                            id="thumbnail"
                            className="w-full text-gray-400 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="image/*"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VideoUploadPage;