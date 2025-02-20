import { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  registerHandler: async () => {},
  loginHandler: async () => {},
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

    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google Login Successful");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  const registerHandler = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Update the state with the registered user
      console.log("Registration successful:", userCredential.user);
    } catch (error) {
      console.error("Registration Error:", error.message);
      throw error;
    }
  };

  const loginHandler = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Update the state with the signed-in user
      console.log("Login successful:", userCredential.user);
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <authContext.Provider value={{ user, loading, googleLoginHandler, registerHandler, loginHandler, logout }}>
      {children}
    </authContext.Provider>
  );
}
