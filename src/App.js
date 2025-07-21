import "./App.css";
import React from "react";
import Home from "./Pages/Home";
import Delete from "./Pages/Delete";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notes from "./Pages/Notes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUserFromFirebase } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        const username = email.split("@")[0];
        dispatch(setUserFromFirebase({ uid: user.uid, username }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          toastClassName="max-w-[320px] sm:max-w-[280px] text-sm sm:text-xs px-4 py-3 rounded-lg shadow-md mt-2"
        />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/home" element={<Notes type="all" />} />
            <Route path="/favorite" element={<Notes type="favorite" />} />
            <Route path="/delete" element={<Delete />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
