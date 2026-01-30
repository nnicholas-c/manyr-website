'use client';

import { Suspense, useRef, useEffect, useState, useSyncExternalStore } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import DefenseModel from './DefenseModel';

// Seeded random for deterministic particle positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate particle positions outside component (pure, deterministic)
function generateParticlePositions(): Float32Array {
  const pos = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    pos[i * 3] = (seededRandom(i * 3) - 0.5) * 10;
    pos[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 10;
    pos[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 10;
  }
  return pos;
}

// Pre-compute positions at module level
const PARTICLE_POSITIONS = generateParticlePositions();

// Hook to detect client-side mounting (SSR-safe)
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Hook for reduced motion preference (SSR-safe)
function useReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}

// Separate component to handle camera animation based on progress
function CameraController({ progress }: { progress: number }) {
  useFrame(({ camera }) => {
    // Subtle camera movement as scroll progresses
    const targetX = THREE.MathUtils.lerp(0, 0.5, progress);
    const targetY = THREE.MathUtils.lerp(2, 2.5, progress);
    const targetZ = THREE.MathUtils.lerp(5, 6, progress);
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0, 0.5, 0);
  });
  
  return null;
}

// Particle field for atmosphere
function ParticleField({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#22d3ee"
        transparent
        opacity={0.4 + progress * 0.3}
        sizeAttenuation
      />
    </points>
  );
}

interface Hero3DSceneProps {
  progress: number;
  className?: string;
}

export default function Hero3DScene({ progress, className }: Hero3DSceneProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();
  const [dpr, setDpr] = useState(1.5);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Adjust DPR for performance
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDpr(mobile ? 1 : Math.min(window.devicePixelRatio, 2));
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // SSR fallback
  if (!isClient) {
    return <div className={`${className} bg-gradient-to-b from-[#1a2535] to-[#0a1520]`} />;
  }

  // Reduced motion fallback
  if (reducedMotion) {
    return <div className={`${className} bg-gradient-to-b from-[#1a2535] to-[#0a1520]`} />;
  }

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 2, 5], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8 + progress * 0.4} 
            color="#ffffff"
          />
          <pointLight 
            position={[-3, 2, -2]} 
            intensity={0.5} 
            color="#22d3ee" 
          />
          <pointLight 
            position={[3, -1, 2]} 
            intensity={0.3 + progress * 0.5} 
            color="#14b8a6" 
          />
          
          {/* Environment for reflections */}
          <Environment preset="night" />
          
          {/* Camera controller */}
          <CameraController progress={progress} />
          
          {/* Main model with floating effect */}
          <Float 
            speed={1.5} 
            rotationIntensity={0.1} 
            floatIntensity={0.2}
            floatingRange={[-0.1, 0.1]}
          >
            <DefenseModel progress={progress} />
          </Float>
          
          {/* Particle field */}
          {!isMobile && <ParticleField progress={progress} />}
          
          {/* Ground plane reflection */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial 
              color="#0a1520"
              metalness={0.9}
              roughness={0.4}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
