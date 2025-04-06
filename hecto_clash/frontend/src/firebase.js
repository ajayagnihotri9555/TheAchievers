
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBgHvWlYQk6rqFwoOYNfvXCXutwl14RlTI",
    authDomain: "theachievers-77494.firebaseapp.com",
    projectId: "theachievers-77494",
    storageBucket: "theachievers-77494.firebasestorage.app",
    messagingSenderId: "1068243647187",
    appId: "1:1068243647187:web:41ad2ca5e00deed63bf226",
    measurementId: "G-X3B7NWDT6K"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
