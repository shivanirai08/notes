import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserFromFirebase } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTimes, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Using react-icons for a consistent look

function Signup({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setUsername("");
      setPassword("");
      setErrors({});
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prevErrors => ({ ...prevErrors, email: "" }));
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors(prevErrors => ({ ...prevErrors, username: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prevErrors => ({ ...prevErrors, password: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Email Validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Username Validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.includes(" ")) {
      newErrors.username = "Username cannot contain spaces";
    } else if (username.length > 15) {
      newErrors.username = "Username must be 15 characters or less";
    }

    // Password Validation
    if (!password || password.trim().length === 0) {
      newErrors.password = "Password cannot be empty or space";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Password must include uppercase, lowercase, number, & symbol";
    }

    setErrors(newErrors);

    // Focus on the first invalid input
    if (newErrors.email) emailRef.current?.focus();
    else if (newErrors.username) usernameRef.current?.focus();
    else if (newErrors.password) passwordRef.current?.focus();

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(setUserFromFirebase({ uid: user.uid, username }));
      toast.success("Signup successful!");
      navigate("/home");
      onClose();
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Email may already be in use.");
      setErrors({ email: "This email is already in use." });
      emailRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl lg:p-8 md:p-6 p-4 w-full max-w-lg relative transform transition-all duration-300 scale-100 ease-out">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-600 dark:text-blue-200 tracking-wide">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-2">
          {/* Email Input Field */}
          <div>
            <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 ${errors.email ? "ring-2 ring-red-500" : ""}`}>
              <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-3" />
              <input
                ref={emailRef}
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
            <p className="text-red-500 text-sm mt-2 ml-1 h-5">{errors.email}</p>
          </div>

          {/* Username Input Field */}
          <div>
            <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 ${errors.username ? "ring-2 ring-red-500" : ""}`}>
              <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
              <input
                ref={usernameRef}
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
            <p className="text-red-500 text-sm mt-2 ml-1 h-5">{errors.username}</p>
          </div>

          {/* Password Input Field */}
          <div>
            <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 ${errors.password ? "ring-2 ring-red-500" : ""}`}>
              <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-2 ml-1 h-5">{errors.password}</p>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

