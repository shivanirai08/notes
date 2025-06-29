import './App.css';
import React from 'react';
import Home from './Pages/Home';
<<<<<<< Updated upstream
=======
import Favorite from './Pages/Favorite';
import Delete from './Pages/Delete';
>>>>>>> Stashed changes
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
<<<<<<< Updated upstream
      <Home />
=======
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </Router>
>>>>>>> Stashed changes
    </ThemeProvider>
  );
}

export default App;
