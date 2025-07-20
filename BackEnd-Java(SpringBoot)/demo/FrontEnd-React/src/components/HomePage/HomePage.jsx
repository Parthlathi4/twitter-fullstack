import React from "react";
import Navigation from "../Navigation/Navigation";
import Homesection from "../HomeSection/Homesection";
import RightPart from "../RightPart/RightPart";
import { useTweetContext } from "../TweetContext.jsx";

const HomePage = () => {
  const {  tweetData, addTweet, toggleLike } = useTweetContext();

  return (
    <div className="flex justify-center">
      <Navigation />
      <div className="w-[45%] border border-gray-300">
        <Homesection tweetData={tweetData} />
      </div>
      <RightPart />
    </div>
  );
};

export default HomePage;
