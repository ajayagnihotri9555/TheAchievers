// src/Login.js
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token); // Store token for future API calls
    alert("Logged in successfully!");
  } catch (err) {
    console.error(err.message);
  }
};
