// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ✅ import global CSS (includes Tailwind)
import App from "./App";
import { TweetProvider } from "./components/TweetContext";
import { Provider } from "react-redux";
import store from "./Store/store"; // ✅ default import

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <TweetProvider>
      <App />
    </TweetProvider>
  </Provider>
);
