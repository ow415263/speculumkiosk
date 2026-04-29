import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Eye, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [viewers, setViewers] = useState(42);

  // Simulate changing viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        minHeight: '100vh', 
        paddingTop: 'var(--nav-height)',
        display: 'flex',
        flexDirection: 'row',
        background: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}
    >
      {/* Left side: Sticky Product Shot */}
      <div style={{
        position: 'sticky',
        top: 'var(--nav-height)',
        height: 'calc(100vh - var(--nav-height))',
        width: '50vw',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, rgba(35,17,133,0.15) 0%, var(--bg-color) 70%)',
        overflow: 'hidden'
      }}>
        <motion.img 
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          src="/src/assets/monster-figure.png" 
          alt="Bo The Bizguist" 
          style={{ width: '80%', maxHeight: '80%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} 
        />
        
        {/* Back button overlay */}
        <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <ArrowLeft size={20} /> Back to Grid
        </Link>
      </div>
      
      {/* Right side: Scrollable Info */}
      <div style={{
        flex: 1,
        padding: '4rem 6rem',
        overflowY: 'auto'
      }}>
        
        {/* Viewers Widget */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(193, 78, 78, 0.15)', color: 'var(--spec-red, #c14e4e)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.9rem', fontWeight: 700 }}>
            <Eye size={16} /> <span>{viewers} people are viewing this right now</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.9rem', fontWeight: 600 }}>
            50/500 left
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '-0.03em', fontFamily: "'Rethink Sans', sans-serif" }}
        >
          Bo The Bizguist
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-muted)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}
        >
          monster on the spectrum
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--spec-red, #c14e4e)', marginBottom: '3rem' }}
        >
          $110.00
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-color)', opacity: 0.9, marginBottom: '1.5rem' }}>
            A limited edition Speculum artifact. Hand-crafted for those who tap into the hidden gems of the city. Exclusive early access via Specuflux. This intricately designed piece features Bo in his signature plaid flannel, holding his favorite dinosaur companion.
          </p>
          <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: 'var(--accent-primary)' }}>✦</span> Hand-painted vinyl construct</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: 'var(--accent-primary)' }}>✦</span> 8.5" tall, 1.2lbs</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ color: 'var(--accent-primary)' }}>✦</span> Ships with certificate of authenticity</li>
          </ul>
        </motion.div>
        
        {/* Huge Add To Cart Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ 
            width: '100%', 
            padding: '1.5rem', 
            borderRadius: '24px', 
            border: 'none', 
            background: 'var(--spec-blue, #231185)', 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(35,17,133,0.3)'
          }}
        >
          <ShoppingCart size={28} /> ADD TO CART
        </motion.button>
        
        <div style={{ height: '80px' }} /> {/* Spacer */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', marginBottom: '4rem' }} />

        {/* Similar Products */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>More from The Cult</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map((item) => (
              <Link to={`/product/similar-${item}`} key={item} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div whileHover={{ y: -5 }} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                  <img src="/src/assets/monster-figure.png" alt="Similar" style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Cult Artifact #{item}</h4>
                  <p style={{ color: 'var(--spec-red, #c14e4e)', fontWeight: 700 }}>$110.00</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProductDetail;
