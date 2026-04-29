import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 10,
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      <div style={{ pointerEvents: 'auto' }}>© {new Date().getFullYear()} Speculum.</div>
      <div style={{ pointerEvents: 'auto', display: 'flex', gap: '2rem' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Instagram</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
