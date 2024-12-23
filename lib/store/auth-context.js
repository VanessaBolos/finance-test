"use client";

import { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  emailRegisterHandler: async () => {},
  emailLoginHandler: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();

  // Google login handler
  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google Login Successful");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  // Email registration handler
  const emailRegisterHandler = async (email, password) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        console.error("Email already exists. Please try logging in.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registered Successfully");
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  // Email login handler
  const emailLoginHandler = async (email, password) => {
    try {
      // Validate email format
      const isValidEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);

      if (!isValidEmail(email)) {
        console.error("Invalid email format.");
        return;
      }

      if (!password) {
        console.error("Password cannot be empty.");
        return;
      }

      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.includes("google.com")) {
        console.error("This email is associated with Google. Please use Google Sign-In.");
        return;
      }

      if (signInMethods.length === 0) {
        console.error("No user found with this email. Consider registering first.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In Successfully");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === "auth/wrong-password") {
        console.error("Incorrect password.");
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const values = {
    user,
    loading,
    googleLoginHandler,
    emailRegisterHandler,
    emailLoginHandler,
    logout,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
