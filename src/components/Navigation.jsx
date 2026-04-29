import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const AnimLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} style={{ textDecoration: 'none', position: 'relative', display: 'inline-flex', flexDirection: 'column' }}>
      <motion.span 
        animate={{ 
          color: isActive ? '#fff1f1' : '#918585',
          fontWeight: isActive ? 600 : 400 
        }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: '17px' }}
      >
        {children}
      </motion.span>
      
      {/* Squiggly line container */}
      <div style={{ height: '6px', width: '100%', position: 'absolute', bottom: -8, left: 0, overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            height: '100%',
            backgroundSize: '12px 6px',
            backgroundPosition: '0 100%',
            backgroundRepeat: 'repeat-x',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 12 6\' fill=\'none\' stroke=\'%23fff1f1\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M0 3 Q 3 6 6 3 T 12 3\'/%3E%3C/svg%3E")'
          }}
        />
      </div>
    </Link>
  );
};

const Navigation = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '85px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '17px 60px',
      zIndex: 100,
      pointerEvents: 'none',
      fontFamily: "'Rethink Sans', sans-serif"
    }}>
      {/* Logo */}
      <div style={{ pointerEvents: 'auto' }}>
        <Link to="/" style={{ display: 'block' }}>
          <img 
            src="/src/assets/logo-white.svg" 
            alt="Speculum Logo" 
            style={{ width: '195px', height: '36px', transition: 'filter 0.2s', cursor: 'pointer' }} 
            onMouseOver={(e) => e.currentTarget.style.filter = 'drop-shadow(0 4px 12px rgba(255,255,255,0.15))'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
          />
        </Link>
      </div>
      
      {/* Desktop Links */}
      <div style={{ 
        display: 'flex', 
        gap: '51px', 
        pointerEvents: 'auto',
        alignItems: 'center'
      }}>
        <AnimLink to="/">The Collectables</AnimLink>
        <AnimLink to="/app">The App</AnimLink>
        <AnimLink to="/about">The Cult</AnimLink>
        
        {/* Sign In CTA */}
        <Link to="/login" style={{ textDecoration: 'none', marginLeft: '11px', position: 'relative' }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: '#171717',
              border: '1px solid #242424',
              padding: '12px 28px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0px -2px 4px 0px rgba(23,23,23,0.25), inset 0px 4px 5.8px 0px rgba(44,44,44,0.25)'
            }}
          >
            <span style={{ 
              color: 'var(--spec-green, #62b788)', 
              fontSize: '17px', 
              fontWeight: 500
            }}>
              Sign In
            </span>
          </motion.div>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
