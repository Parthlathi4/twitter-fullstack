import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Button } from '@mui/material';
import SubscriptionModel from '../Subscription/subscriptionModel'; // ✅ correct import path and casing

const RightPart = () => {
  const handleChangeTheme = () => {
    console.log("handle change theme");
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="py-5 px-4 sticky top-0 w-full max-w-sm space-y-6">
      
      {/* 🔍 Search Bar */}
      <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm">
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent outline-none px-3 text-sm w-full"
        />
        <Brightness4Icon
          className="text-gray-600 hover:text-black cursor-pointer ml-2"
          onClick={handleChangeTheme}
        />
      </div>

      {/* ✅ Get Verified Section */}
      <section className="bg-blue-50 p-4 rounded-2xl shadow-md">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <p className="text-sm text-gray-700 my-2">
          Subscribe to unlock new features and reach more people.
        </p>
        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: "bold",
            paddingX: "20px",
            paddingY: "8px",
            fontSize: "14px",
          }}
          onClick={() => setOpenModal(true)} // ✅ triggers modal open
        >
          Get Verified
        </Button>
      </section>

      {/* 🔥 What's Happening Section */}
      <section className="space-y-3">
        <h1 className="text-xl font-bold">What's happening</h1>

        <div className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 cursor-pointer transition">
          <p className="text-xs text-gray-500">Trending in India</p>
          <h2 className="font-semibold">#ReactJS</h2>
          <p className="text-xs text-gray-500">42.1K Tweets</p>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 cursor-pointer transition">
          <p className="text-xs text-gray-500">Technology · Trending</p>
          <h2 className="font-semibold">#TailwindCSS</h2>
          <p className="text-xs text-gray-500">18.9K Tweets</p>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 cursor-pointer transition">
          <p className="text-xs text-gray-500">WebDev · Trending</p>
          <h2 className="font-semibold">#MaterialUI</h2>
          <p className="text-xs text-gray-500">7.5K Tweets</p>
        </div>
      </section>

      {/* 📦 Modal Component Mount */}
      <SubscriptionModel open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default RightPart;
