import React, { useState } from "react";
import { useTweetContext } from "../TweetContext";
import { Smile, ImageIcon } from "lucide-react";
import Picker from "emoji-picker-react";

const TweetInput = () => {
  const { addTweet } = useTweetContext();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setContent((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleTweet = () => {
    if (content.trim() || selectedImage) {
      addTweet({ content, image: selectedImage });
      setContent("");
      setSelectedImage(null);
    }
  };

  return (
    <div className="border-b border-gray-300 p-4">
      <textarea
        className="w-full border-none resize-none focus:outline-none text-lg"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {selectedImage && (
        <img src={selectedImage} alt="Preview" className="mt-2 rounded-lg max-h-60" />
      )}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <label htmlFor="img-upload" className="cursor-pointer">
            <ImageIcon className="text-blue-500" />
            <input
              id="img-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smile className="text-yellow-500" />
          </button>
        </div>
        <button
          onClick={handleTweet}
          className="bg-blue-500 text-white px-4 py-1 rounded-full font-semibold"
        >
          Tweet
        </button>
      </div>
      {showEmojiPicker && (
        <div className="mt-2">
          <Picker onEmojiClick={(e, emojiObject) => handleEmojiClick(emojiObject)} />
        </div>
      )}
    </div>
  );
};

export default TweetInput;
