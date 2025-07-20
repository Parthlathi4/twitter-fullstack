import React from 'react';
import TweetInput from './TweetInput';
import TweetCard from './TweetCard';
import { useTweetContext } from '../TweetContext';

const Homesection = () => {
  const { tweetData } = useTweetContext();  // ✅ Correct


  return (
    <div className="flex-1 border-x border-gray-700">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">Home</h2>
      <TweetInput />
      { tweetData?.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Homesection;
