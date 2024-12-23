import React, { useContext, useState } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Importing toast styles
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";  // Ensure 'auth' is properly imported

function SignIn() {
  const { googleLoginHandler, emailLoginHandler } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Toast configuration
  const showToast = (message, type) => {
    toast(message, {
      type: type,
      position: "bottom-center",  // Fallback solution
    });
  };

  // Form validation for email and password
  const validateForm = () => {
    if (!email || !password) {
      showToast("Please enter both email and password.", "error");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return false;
    }
    if (password.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return false;
    }
    return true;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await emailLoginHandler(email, password);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.code === "auth/user-not-found") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          showToast("Account created successfully. You are now logged in!", "success");
        } catch (signupError) {
          console.error("Sign up failed:", signupError);
          if (signupError.code === "auth/weak-password") {
            showToast("Password is too weak. Please use at least 6 characters.", "error");
          } else if (signupError.code === "auth/invalid-email") {
            showToast("Invalid email address. Please check and try again.", "error");
          } else {
            showToast("An unexpected error occurred. Please try again.", "error");
          }
        }
      } else if (error.code === "auth/wrong-password") {
        showToast("Incorrect password. Please try again.", "error");
      } else if (error.code === "auth/invalid-email") {
        showToast("Invalid email address. Please check and try again.", "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    }
  };

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Welcome 👋</h1>

      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
        <div className="h-50">
          <img
            className="object-cover w-full h-full"
            src="https://www.bloomadvisors.com/wp-content/uploads/2021/03/Savings-101.jpg"
            alt="Sign In Image"
          />
        </div>

        <div className="px-4 py-4">
          <h3 className="text-2xl text-center">Please sign in to continue</h3>

          {/* Google Login Button */}
          <button
            onClick={googleLoginHandler}
            className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>

          <div className="my-4 text-center">
            <p className="text-white">or sign in with email</p>
          </div>

          {/* Email/Password Login Form */}
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg text-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg text-black"
              required
            />
            <button
              type="submit"
              className="mt-4 p-4 bg-blue-600 text-white font-medium rounded-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <div>
        <ToastContainer />
      </div>
    </main>
  );
}

export default SignIn;
