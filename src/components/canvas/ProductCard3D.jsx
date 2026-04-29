import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, RoundedBox } from '@react-three/drei';
import { MathUtils } from 'three';
import { useNavigate } from 'react-router-dom';

const ProductCard3D = ({ id, position }) => {
  const groupRef = useRef();
  const barRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Randomize inventory stats for this specific card
  const inventoryState = useMemo(() => {
    const max = 500;
    const current = Math.floor(Math.random() * 450) + 10;
    return { current, max, ratio: current / max };
  }, []);

  const barProgress = useRef(0);

  // Animate hover state
  useFrame((state) => {
    const targetScale = hovered ? 1.05 : 1;
    groupRef.current.scale.setScalar(MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
    
    const targetZ = hovered ? position[2] + 1 : position[2];
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);

    if (hovered) {
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.3, 0.1);
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.3, 0.1);
      
      barProgress.current = MathUtils.lerp(barProgress.current, inventoryState.ratio, 0.05);
    } else {
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
      
      barProgress.current = MathUtils.lerp(barProgress.current, 0, 0.1);
    }

    if (barRef.current) {
      const currentWidth = barProgress.current * 4.4;
      barRef.current.scale.x = currentWidth > 0.01 ? currentWidth : 0.01;
      barRef.current.position.x = -2.2 + (currentWidth / 2);
    }

    if (textRef.current) {
      const currentWidth = barProgress.current * 4.4;
      textRef.current.position.x = -2.2 + currentWidth + 0.1; 
      const displayNum = Math.floor(barProgress.current * inventoryState.max);
      textRef.current.text = `${displayNum}/${inventoryState.max} left`;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { 
        e.stopPropagation(); 
        if (e.delta <= 5) {
          navigate(`/product/${id}`); 
        }
        document.body.style.cursor = 'auto'; 
      }}
    >
      <Image
        url="/src/assets/monster-figure.png"
        transparent
        scale={[4.74, 5.54]}
        toneMapped={false}
      />
      
      {hovered && (
        <group position={[0, 0, 0.1]}>
           <mesh position={[0, 2.7, 0]}>
             <planeGeometry args={[4.4, 0.03]} />
             <meshBasicMaterial color="#c14e4e" opacity={0.28} transparent />
           </mesh>
           
           <mesh ref={barRef} position={[-2.2, 2.7, 0.01]}>
             <planeGeometry args={[1, 0.03]} /> 
             <meshBasicMaterial color="#c14e4e" />
           </mesh>

          <Text
            ref={textRef}
            position={[0, 2.85, 0]}
            fontSize={0.2}
            color="#c14e4e"
            anchorX="right"
            anchorY="bottom"
            fontWeight={800}
          >
            0/500 left
          </Text>

          <Text
            position={[-2.1, -1.6, 0]}
            fontSize={0.5} 
            color="#ffffff"
            anchorX="left"
            anchorY="bottom"
            fontWeight="bold"
          >
            Bo The Bizguist,
          </Text>

          <Text
            position={[-2.05, -2.0, 0]}
            fontSize={0.25} 
            color="#ececec"
            anchorX="left"
            anchorY="bottom"
          >
            monster on the spectrum
          </Text>

          {/* Price Tag Pill using perfectly rounded, flattened CapsuleGeometry */}
          <group position={[-1.4, -2.4, 0]}>
            {/* White/Pink inner pill */}
            <mesh rotation={[0, 0, Math.PI/2]} scale={[1, 1, 0.05]}>
              <capsuleGeometry args={[0.2, 0.7, 16, 32]} />
              <meshBasicMaterial color="#fff1f1" />
            </mesh>
            
            {/* Red border pill */}
            <mesh position={[0,0,-0.01]} rotation={[0, 0, Math.PI/2]} scale={[1, 1, 0.05]}>
              <capsuleGeometry args={[0.225, 0.7, 16, 32]} />
              <meshBasicMaterial color="#c14e4e" />
            </mesh>
            
            <Text
              position={[0, 0, 0.012]}
              fontSize={0.16}
              color="#c14e4e"
              fontWeight={800}
            >
              $ 110.00
            </Text>
          </group>
        </group>
      )}
    </group>
  );
};

export default ProductCard3D;
