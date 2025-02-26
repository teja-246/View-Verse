import { useState } from "react";

const CommentSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([
    { name: "Teja", text: "This is an amazing video!" },
    { name: "Aryan", text: "Great content, keep it up!" },
    { name: "Priya", text: "I learned a lot from this, thanks!" },
    { name: "Rahul", text: "Can you make a tutorial on this topic?" },
    { name: "Neha", text: "Awesome work!" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (newComment.trim()) {
      setComments([{ name: "You", text: newComment }, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <div className="bg-slate-900 p-4 rounded-lg transition-all duration-300 text-white text-lg">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="font-semibold text-white">Comments</div>
          <div className="text-sm text-gray-400">{expanded ? "View less" : "Click to view all comments"}</div>
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handlePostComment}
          >
            Post
          </button>
        </div>
        {!expanded ? (
          <div className="mt-2 text-white cursor-pointer" onClick={() => setExpanded(true)}>
            {comments[0].name}: {comments[0].text}
          </div>
        ) : (
          <div className="mt-2 space-y-3 overflow-y-auto h-48">
            {comments.map((comment, index) => (
              <div key={index} className="bg-slate-800 p-3 rounded shadow text-white">
                <span className="font-bold">{comment.name}:</span> {comment.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
