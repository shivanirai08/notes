import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8 dark:bg-zinc-900">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white text-center">
        Welcome to Notes App
      </h2>
      <p className="mb-6 text-gray-500 dark:text-gray-300 text-center">
        Please login or sign up to continue
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          className="w-full sm:w-auto bg-blue-600 dark:bg-blue-400 text-white font-medium dark:text-black px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
          onClick={() => setIsLoginOpen(true)}
        >
          Login
        </button>
        <button
          className="w-full sm:w-auto bg-green-600 dark:bg-green-400 text-white font-medium dark:text-black px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-500 transition"
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
