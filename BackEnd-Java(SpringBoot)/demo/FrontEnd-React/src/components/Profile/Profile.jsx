import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import { useTweetContext } from '../TweetContext';
import TweetCard from '../HomeSection/TweetCard';
import ProfileModel from './ProfileModel';

const Profile = () => {
  const { tweets } = useTweetContext();
  const [openProfileModal, setOpenProfileModal] = useState(false);

  // 🔁 1. User & image states
  const [user, setUser] = useState({
    name: 'Raam Kapoor',
    username: 'Raam',
    bio: 'Developer | Creator | Thinker',
    website: 'https://raamkapoor.dev',
    location: 'Mumbai, India',
    joined: 'January 2022',
  });

  const [profileImage, setProfileImage] = useState('https://cdn.pixabay.com/photo/2025/03/26/15/43/mushrooms-9494682_1280.jpg');
  const [coverImage, setCoverImage] = useState('https://cdn.pixabay.com/photo/2024/04/26/22/23/landscape-8722691_1280.jpg');

  // 🔁 2. Update handler from modal
  const handleProfileSave = (updatedUser, newProfileImage, newCoverImage) => {
    setUser(updatedUser);
    setProfileImage(newProfileImage);
    setCoverImage(newCoverImage);
  };

  return (
    <div className="flex min-h-screen text-black">
      <Navigation />

      <div className="flex-1 border-x border-gray-700 overflow-y-auto">
        <div className="relative w-full h-48 bg-gray-800">
          <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute left-4 -bottom-12">
            <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border-4 border-black" />
          </div>
        </div>

        <div className="pt-16 px-4 pb-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="mt-2">{user.bio}</p>

          <div className="text-sm text-gray-400 mt-2 space-y-1">
            <p>📍 {user.location}</p>
            <p>
              🔗{' '}
              <a href={user.website} className="text-blue-400 hover:underline">
                {user.website}
              </a>
            </p>
            <p>📅 Joined {user.joined}</p>
          </div>

          <button
            onClick={() => setOpenProfileModal(true)}
            className="mt-4 px-4 py-2 border border-gray-500 rounded-full hover:bg-gray-800"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-4">
          {tweets?.length > 0 &&
            tweets
              .filter((tweet) => tweet.username === user.username)
              .map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)}
        </div>
      </div>

      <RightPart />

      {/* ✅ 3. Pass data and handler to modal */}
      {openProfileModal && (
        <ProfileModel
          open={openProfileModal}
          onClose={() => setOpenProfileModal(false)}
          user={user}
          profileImage={profileImage}
          coverImage={coverImage}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
};

export default Profile;
