import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { API_BASE_URL } from "../config/api"; // ✅ Correct import

const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
  const [tweetData, setTweetData] = useState([]);

  const addTweet = ({ content, image }) => {
    const newTweet = {
      id: uuidv4(),
      content,
      image,
      username: "Guest",
      liked: false,
      likeCount: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setTweetData((prev) => [newTweet, ...prev]);
  };

  const toggleLike = async (id) => {
    try {
      const tweet = tweetData.find((t) => t.id === id);
      if (!tweet) return;

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/${id}/likes`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to toggle like");
        return;
      }

      setTweetData((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                liked: !t.liked,
                likeCount: t.liked ? t.likeCount - 1 : (t.likeCount || 0) + 1,
              }
            : t
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const addComment = (tweetId, text) => {
    setTweetData((prev) =>
      prev.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              comments: [
                ...tweet.comments,
                {
                  id: uuidv4(),
                  username: "Guest",
                  text,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : tweet
      )
    );
  };

  return (
    <TweetContext.Provider
      value={{ tweetData, addTweet, toggleLike, addComment }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export const useTweetContext = () => useContext(TweetContext);
export { TweetContext };
