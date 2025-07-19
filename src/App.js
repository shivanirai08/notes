import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Delete from './Pages/Delete';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notes from './Pages/Notes';
import { Navigate } from 'react-router-dom';

function App() {

  return (
    <ThemeProvider>
      <Router>
        <ToastContainer position='top-center' autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<Navigate to="/home" replace />} />
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
