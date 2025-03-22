import React, { useState } from 'react';

const AIContentGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [aiTitle, setAiTitle] = useState('');
  const [aiDescription, setAiDescription] = useState('');
  const [aiVideoUrl, setAiVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return alert('Please enter a prompt');
    setLoading(true);

    try {
        // AI Content Generation API call
        const response = await fetch('http://localhost:8000/api/v1/users/generate-content', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputText }),
        });

        const data = await response.json();
        console.log("AI Response:", data);

        let generatedTitle = 'Could not generate video title';
        let generatedDescription = 'Could not generate video description.';

        if (response.ok && data.data) {
            const outputText = data.data.candidates[0].content.parts[0].text;
            const cleanJsonString = outputText.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(cleanJsonString);
            generatedTitle = parsed.title;
            generatedDescription = parsed.description;
        }

        // Video Generation API call
        const videoResponse = await fetch('http://localhost:8000/api/v1/users/text-to-video', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script: inputText }),
        });

        const videoData = await videoResponse.json();
        console.log("Video Response:", videoData);

        const videoUrl = videoData.videoUrl || 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

        // Update the state
        setAiTitle(generatedTitle);
        setAiDescription(generatedDescription);
        setAiVideoUrl(videoUrl);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate AI content');
    } finally {
        setLoading(false);
    }
};


  const handleUpload = async (event) => {
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
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded-md`}
          >
            {loading ? 'Generating...' : 'Generate'}
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
