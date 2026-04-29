import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kiosk from './pages/kiosk/Kiosk';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Kiosk />} />
      </Routes>
    </Router>
  );
}

export default App;
