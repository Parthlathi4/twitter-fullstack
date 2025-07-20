import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const navItems = [
  { title: "Home", icon: <HomeIcon />, path: "/home" },
  { title: "Explore", icon: <ExploreIcon />, path: "/explore" },
  { title: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
  { title: "Messages", icon: <MessageIcon />, path: "/messages" },
  { title: "Lists", icon: <ListAltIcon />, path: "/lists" },
  { title: "Communities", icon: <GroupIcon />, path: "/communities" },
  { title: "Verified", icon: <VerifiedIcon />, path: "/verified" },
  { title: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
];

const Navigation = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    profile: ""
  });

  const navigate = useNavigate();

  // ✅ Get user data from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.name || "",
          username: parsed.username || "",
          profile: parsed.profile || ""
        });
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/signup"); // replace with real logout API
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // remove stored user info too
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed!");
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen p-2 text-white bg-black">
      <div className="p-4 text-3xl">🐦</div>

      <div className="space-y-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800 rounded-full transition-all"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-lg font-medium">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="px-4 pt-6">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition-all">
          Tweet
        </button>
      </div>

      <div className="relative mt-6 px-4">
        <div
          className="flex items-center justify-between hover:bg-gray-800 p-3 rounded-full cursor-pointer"
          onClick={() => setShowLogout(!showLogout)}
        >
          <div className="flex items-center gap-3">
            {user.profile ? (
              <img
                src={user.profile}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <AccountCircleIcon className="text-3xl" />
            )}

            <div>
              <p className="text-sm font-semibold">{user.name || "Your Name"}</p>
              <p className="text-sm text-gray-400">@{user.username || "username"}</p>
            </div>
          </div>
          <MoreHorizIcon className="text-gray-400 text-xl" />
        </div>

        {showLogout && (
          <div className="absolute left-0 bottom-14 w-full bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg z-50">
            <button onClick={handleLogout} className="w-full text-left hover:text-red-400">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
