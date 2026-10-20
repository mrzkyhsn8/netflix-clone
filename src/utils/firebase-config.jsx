// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDwz2NtgohuygrlSSkhPpmjdHHlLrjtwWU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "netflix-clone-70e9f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "netflix-clone-70e9f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "netflix-clone-70e9f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "11813157818",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:11813157818:web:4cb83b7bb601bb7168bb83",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VQVR87SL9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);