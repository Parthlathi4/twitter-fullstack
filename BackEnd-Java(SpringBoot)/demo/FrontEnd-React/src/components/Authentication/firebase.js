// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAww3HDkw6QZP1QPpnxsPkJ9oO84gM3NXk",
  authDomain: "twitter-clone-8ace4.firebaseapp.com",
  projectId: "twitter-clone-8ace4",
  storageBucket: "twitter-clone-8ace4.appspot.com",
  messagingSenderId: "868941044834",
  appId: "1:868941044834:web:4a6356f66c5e6d5ec6453b",
  measurementId: "G-R4J1WD1KJB"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication and Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Export services
export { auth, provider, db };
