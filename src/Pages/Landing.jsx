import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Welcome to Notes App</h2>
      <p className="mb-6 text-gray-500">Please login or sign up to continue</p>
      <div className="space-x-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setIsLoginOpen(true)}
        >
          Login
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => setIsSignupOpen(true)}
        >
          Sign Up
        </button>
      </div>

      {isLoginOpen && (
        <Login isOpen={true} onClose={() => setIsLoginOpen(false)} />
      )}
      {isSignupOpen && (
        <Signup isOpen={true} onClose={() => setIsSignupOpen(false)} />
      )}
    </div>
  );
}
