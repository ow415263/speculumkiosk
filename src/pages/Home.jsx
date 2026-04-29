import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Environment } from '@react-three/drei';
import GridScene from '../components/canvas/GridScene';

import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-color)', position: 'relative' }}
    >
      
      {/* 3D Canvas Background & Interactive Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 40 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <GridScene />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay text removed */}
      
    </motion.div>
  );
};

export default Home;
