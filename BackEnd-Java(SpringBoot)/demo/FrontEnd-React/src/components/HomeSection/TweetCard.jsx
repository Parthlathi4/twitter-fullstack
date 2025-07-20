import React, { useState } from "react";
import { FaRegComment, FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { useTweetContext } from "../TweetContext";
import ReplyModel from "./ReplyModel";

const TweetCard = ({ tweet }) => {
  const { toggleLike } = useTweetContext();
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [liked, setLiked] = useState(tweet.liked);
  const [likeCount, setLikeCount] = useState(tweet.likeCount || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // adjust if stored differently
      const response = await fetch(`http://localhost:8080/api/${tweet.id}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Toggle liked state and update like count based on backend response
        // Since backend toggles like, we flip liked here:
        const newLiked = !liked;
        setLiked(newLiked);

        // Adjust likeCount accordingly:
        setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      } else {
        console.error("Failed to toggle like");
      }
    } catch (err) {
      console.error("Error liking tweet:", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="font-semibold">{tweet.username}</div>
      <div className="text-gray-700">{tweet.content}</div>

      {tweet.image && (
        <img
          src={tweet.image}
          alt="tweet"
          className="mt-2 rounded-lg max-h-60"
        />
      )}

      <div className="mt-2 flex space-x-6 text-gray-500 items-center">
        {/* Comment Icon */}
        <FaRegComment
          className="cursor-pointer"
          onClick={() => setOpenReplyModal(true)}
        />

        {/* Like / Unlike Icon with count */}
        <div className="flex items-center space-x-1 cursor-pointer" onClick={handleLike}>
          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}
          <span>{likeCount}</span>
        </div>

        {/* Retweet Icon */}
        <FaRetweet className="cursor-pointer hover:text-green-500" />
      </div>

      {/* Render Comments if any */}
      {tweet.comments && tweet.comments.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-300 space-y-2">
          {tweet.comments.map((comment, index) => (
            <div key={index}>
              <span className="font-semibold mr-2">@{comment.username}:</span>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {openReplyModal && (
        <ReplyModel
          tweet={tweet}
          open={openReplyModal}
          handleClose={() => setOpenReplyModal(false)}
        />
      )}
    </div>
  );
};

export default TweetCard;
