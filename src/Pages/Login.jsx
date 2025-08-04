import React, { useState, useRef, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserFromFirebase } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prevErrors => ({ ...prevErrors, password: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (newErrors.email) emailRef.current?.focus();
    else if (newErrors.password) passwordRef.current?.focus();

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(setUserFromFirebase({ uid: user.uid, email }));
      toast.success("Logged in successfully!");
      onClose();
      navigate("/home");
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
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
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-2">
          {/* Email Input Field */}
          <div>
            <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 ${errors.email ? "ring-2 ring-red-500" : ""}`}>
              <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
              <input
                ref={emailRef}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
            <p className="text-red-500 text-sm mt-2 ml-1 h-5">{errors.email}</p>
          </div>

          {/* Password Input Field */}
          <div>
            <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 ${errors.password ? "ring-2 ring-red-500" : ""}`}>
              <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
            <p className="text-red-500 text-sm mt-2 ml-1 h-5">{errors.password}</p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;