// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TweetProvider } from "./components/TweetContext";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import Authentication from "./components/Authentication/Authentication";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assuming user is stored in localStorage after login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <TweetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/signup" element={<Authentication />} />
          <Route path="/home" element={<HomePage user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </Router>
    </TweetProvider>
  );
}

export default App;
