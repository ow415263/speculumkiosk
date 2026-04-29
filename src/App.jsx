import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import AppPage from './pages/AppPage';
import Kiosk from './pages/kiosk/Kiosk';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const Chrome = () => (
  <>
    <Navigation />
    <main style={{ flex: 1, position: 'relative' }}>
      <AnimatedRoutes />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="*" element={<Chrome />} />
      </Routes>
    </Router>
  );
}

export default App;
