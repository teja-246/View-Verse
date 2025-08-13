import React from "react";
import { useState, useEffect } from "react";
const CommentSection = ({videoId}) => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([
    { owner: "", content: "" },
  ]);
  const [newComment, setNewComment] = useState("");
  const Url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchComments = async () => {
        try {
            const response = await fetch(`${Url}/get-comments/${videoId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                  },
                });
            const data = await response.json();

            if (data.success) {
                setComments(data.data);
            } else {
                console.error("Failed to fetch comments:", data.message);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    fetchComments();
}, [videoId]);

  const handlePostComment = async() => {
    if (newComment.trim()) {
      setComments([{ owner: {username : "You"} , content: newComment }, ...comments]);
      setNewComment("");
    }

    try {
      const response = await fetch(`${Url}/add-comment/${videoId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Comment added:", result);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="w-[95%] m-6 border-[2px] border-white rounded-2xl">
      <div className="bg-black w-full p-4 rounded-2xl transition-all duration-300 text-white text-lg">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="font-semibold text-white">Comments</div>
          <div className="text-sm text-gray-400">
            {expanded ? "View less" : "Click to view all comments"}
          </div>
        </div>
        <div className="mt-2 mb-3 flex items-center space-x-2">
          <textarea
            type="text"
            placeholder="Add your comment"
            className="w-full p-2 rounded bg-slate-800 text-white outline-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-[rgba(211,255,97,1)] text-black px-4 py-2 rounded hover:bg-[#e7ffa9] transition"
            onClick={handlePostComment}
          >
            Post
          </button>
        </div>
        {!expanded ? (
          <div
            className="mt-2 text-white cursor-pointer"
            onClick={() => setExpanded(true)}
          >
            {comments[0]?.owner.username}: {comments[0]?.content}
          </div>
        ) : (
          <div className="mt-2 space-y-3 overflow-y-auto h-48">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="bg-slate-800 p-3 rounded shadow text-white"
              >
                <span className="font-bold">{comment.owner.username}:</span>{" "}
                {comment.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
