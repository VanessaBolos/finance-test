import React, { useContext, useState } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const { googleLoginHandler, registerHandler } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please enter both email and password to register.");
      return;
    }

    try {
      await registerHandler(email, password);
      alert("Registration successful! You can now log in.");
    } catch (error) {
      console.error("Error in registration flow:", error.message);
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

          {/* Email/Password Inputs */}
          <div className="mt-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-2 text-black rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 text-black rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full p-4 mt-4 font-medium text-white bg-green-700 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
