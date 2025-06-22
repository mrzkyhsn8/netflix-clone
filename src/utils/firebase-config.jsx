// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwz2NtgohuygrlSSkhPpmjdHHlLrjtwWU",
  authDomain: "netflix-clone-70e9f.firebaseapp.com",
  projectId: "netflix-clone-70e9f",
  storageBucket: "netflix-clone-70e9f.firebasestorage.app",
  messagingSenderId: "11813157818",
  appId: "1:11813157818:web:4cb83b7bb601bb7168bb83",
  measurementId: "G-VQVR87SL9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);