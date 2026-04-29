import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';
import { useDrag } from '@use-gesture/react';
import ProductCard3D from './ProductCard3D';

const GridScene = () => {
  const groupRef = useRef();
  const targetPos = useRef([0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // Mouse parallax effect for the whole grid
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const floatingY = Math.sin(t * 0.5) * 0.5;
    
    // Lerp towards the drag target + parallax
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetPos.current[0], 0.08);
    // Combine drag Y and floating Y
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, -targetPos.current[1] + floatingY, 0.08);
    
    // Mouse parallax tilt
    const mouseX = (state.pointer.x * state.viewport.width) / 20;
    const mouseY = (state.pointer.y * state.viewport.height) / 20;
    
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouseY * -0.1, 0.05);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.1, 0.05);
  });

  const bind = useDrag(({ offset: [x, y] }) => {
    targetPos.current = [x / aspect, y / aspect];
  }, { 
    pointerEvents: true,
    // Add pixel-perfect boundaries mapping to the 3D grid dimensions
    bounds: { 
      left: -18 * aspect, 
      right: 18 * aspect, 
      top: -24 * aspect, 
      bottom: 20 * aspect 
    },
    rubberband: true 
  });

  // Generate 5x6 grid as requested in Figma Layout
  const cards = [];
  const spacingX = 6;
  const spacingY = 7.5;
  
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 5; col++) {
      const x = (col - 2) * spacingX;
      // Start slightly lower so the logo isn't blocked by the center row
      const y = (row - 2) * -spacingY + 2;
      cards.push(
        <ProductCard3D 
          key={`${row}-${col}`} 
          id={`${row}-${col}`}
          position={[x, y, 0]} 
        />
      );
    }
  }

  // Pointer events true on mesh to capture drags over the empty space
  return (
    <group ref={groupRef}>
      <mesh {...bind()} visible={false} position={[0, 0, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {cards}
    </group>
  );
};

export default GridScene;
