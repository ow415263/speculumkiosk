import React from 'react';
import { motion } from 'framer-motion';

const AppPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      style={{ 
        minHeight: '100vh', 
        paddingTop: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="glass-panel" style={{ 
        maxWidth: '1000px', 
        width: '90%', 
        padding: '4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '4rem',
        background: 'linear-gradient(145deg, rgba(126, 34, 206, 0.1) 0%, rgba(24, 24, 27, 0.5) 100%)'
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>
            The App
          </h2>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
            SPECUFLUX
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            The ultimate tracking app for tapping into hidden gems and underground activities. 
            Connect with cool people in cool cities. App users gain exclusive early access and allowlists to our physical rare artifacts like monster figurines and phone cases before they sell out.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary">Download Testflight</button>
            <button className="btn-glass">Learn More</button>
          </div>
        </div>
        
        <div style={{ 
          flex: 1, 
          height: '500px', 
          background: 'var(--surface-base)',
          borderRadius: '30px',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 50px rgba(126, 34, 206, 0.15)'
        }}>
          {/* App Mockup Placeholder */}
          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>App Interface Core</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AppPage;
