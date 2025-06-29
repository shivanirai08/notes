import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Favorite from './Pages/Favorite';
import Delete from './Pages/Delete';
import DeleteModal from './Pages/DeleteModal';
import { ThemeProvider } from './ThemeContext';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/delete/:id" element={<DeleteModal />} />
          {/* <Route path="/note/:id" element={<Opennote />} />
          <Route path="/addnote" element={<Addnote />} />
          <Route path="/editnote/:id" element={<Editnote />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
