import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTwitter
} from "react-icons/fa";
import {
  FiHome,
  FiHash,
  FiBell,
  FiMail,
  FiBookmark,
  FiUser,
  FiMoreHorizontal,
} from "react-icons/fi";

const Navigation = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-between h-screen px-4 py-6 border-r w-64 relative text-black bg-white">
      <FaTwitter className="text-3xl text-blue-500 mb-6" />

      <nav className="space-y-4 text-lg font-medium">
        <div
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-full"
          onClick={() => navigate("/home")}
        >
          <FiHome className="text-2xl" />
          <span>Home</span>
        </div>

        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
          <FiHash className="text-2xl" />
          <span>Explore</span>
        </div>

        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
          <FiBell className="text-2xl" />
          <span>Notifications</span>
        </div>

        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
          <FiMail className="text-2xl" />
          <span>Messages</span>
        </div>

        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
          <FiBookmark className="text-2xl" />
          <span>Bookmarks</span>
        </div>

        <div
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-full"
          onClick={() => navigate("/profile")}
        >
          <FiUser className="text-2xl" />
          <span>Profile</span>
        </div>
      </nav>

      <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600">
        Tweet
      </button>

      {/* Bottom user section */}
      <div className="relative mt-auto">
        <div
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer"
          onClick={() => setShowLogout((prev) => !prev)}
        >
          <img
            src={
              user?.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="font-semibold truncate max-w-[100px]">
              {user?.name || "Your Name"}
            </p>
            <p className="text-sm text-gray-500 truncate max-w-[100px]">
              @{user?.username || "username"}
            </p>
          </div>
          <FiMoreHorizontal className="ml-auto" />
        </div>

        {showLogout && (
          <div className="absolute bottom-16 left-2 w-40 bg-white border rounded shadow-md z-50">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
