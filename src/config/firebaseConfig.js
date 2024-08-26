// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDSCNSfJEpxY7dGFcJPNTftdkucQjv92fs",
  authDomain: "notes-app-d7fa0.firebaseapp.com",
  projectId: "notes-app-d7fa0",
  storageBucket: "notes-app-d7fa0.appspot.com",
  messagingSenderId: "314221261070",
  appId: "1:314221261070:web:682a0984812adc402de75f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage

