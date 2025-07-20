import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RepeatIcon from '@mui/icons-material/Repeat';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Divider } from '@mui/material';
import TweetCard from '../HomeSection/TweetCard';

const Tweetdetails = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <React.Fragment>
      {/* 🔙 Header */}
      <section className="z-50 flex items-center sticky top-0 bg-white p-4 shadow-sm border-b">
        <RepeatIcon className="text-gray-600 mr-2" />
        <h1 className="text-xl font-bold opacity-90">Tweet</h1>
        <MoreHorizIcon
          className="ml-auto cursor-pointer text-gray-600 hover:text-black"
          onClick={handleBack}
        />
      </section>

      {/* 🧵 Original Tweet */}
      <section>
        <TweetCard
          name="Code with Parth"
          username="codewithParth"
          time="2m"
          content="This is the original tweet you clicked!"
          avatar="https://avatars.githubusercontent.com/u/9919?v=4"
        />
        <Divider sx={{ margin: '2rem 0' }} />
      </section>

      {/* 💬 Replies */}
      <section>
        {[1, 2, 3].map((_, i) => (
          <TweetCard
            key={i}
            name="Reply User"
            username={`user${i}`}
            time={`${i + 1}m`}
            content={`This is reply #${i + 1} to the tweet.`}
            avatar=""
          />
        ))}
      </section>
    </React.Fragment>
  );
};

export default Tweetdetails;
