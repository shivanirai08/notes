import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserFromFirebase } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Signup({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [existingUsernames, setExistingUsernames] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setExistingUsernames([]);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!username.trim()) {
      setErrorMsg("Username cannot be empty or have spaces.");
      return;
    }

    if (username.includes(" ")) {
      setErrorMsg("Username cannot contain spaces.");
      return;
    }

    if (username.length > 15) {
      setErrorMsg("Username must be 15 characters or less.");
      return;
    }

    if (existingUsernames.includes(username.toLowerCase())) {
      setErrorMsg(`${username} already exists.`);
      return;
    }

    if (password.length < 6 || !/[!@#$%^&*]/.test(password)) {
      setErrorMsg("Password must be 6+ characters and include a special character.");
      return;
    }

    const email = `${username}@yourapp.com`;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(setUserFromFirebase({ uid: user.uid, username }));
      toast.success("Signup successful!");
      navigate("/home");
      onClose();
    } catch (error) {
      setErrorMsg("Signup failed. Try a different username or password.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              {showPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
            </button>
          </div>

          {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

