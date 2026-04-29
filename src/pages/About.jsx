import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ 
        minHeight: '100vh', 
        paddingTop: 'var(--nav-height)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', textAlign: 'center', padding: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '2rem' }}>About Speculum</h1>
        <p style={{ color: 'var(--text-color)', fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '2rem' }}>
          Speculum is a multifaceted brand centered around connecting cool people with hidden gems. 
          We bridge the digital and physical worlds through rare artifacts and our flagship app, Specuflux.
        </p>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left', marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>Our Mission</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            To create an underground directory for Gen-Z and Gen-Alpha, making exclusive experiences and 
            limited-edition physical items accessible to those truly tapped into the culture.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
