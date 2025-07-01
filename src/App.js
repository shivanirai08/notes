import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Favorite from './Pages/Favorite';
import Delete from './Pages/Delete';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ToastContainer position='top-center' autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
