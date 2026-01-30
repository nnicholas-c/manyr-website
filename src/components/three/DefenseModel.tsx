'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DefenseModelProps {
  progress: number; // 0 to 1, scroll progress
}

// Easing function for smooth transitions
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function DefenseModel({ progress }: DefenseModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Mesh>(null);
  const panelsRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Smoothed progress for animation
  const easedProgress = easeInOutCubic(progress);

  // Create materials
  const materials = useMemo(() => ({
    screen: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a2a3a'),
      metalness: 0.8,
      roughness: 0.2,
      emissive: new THREE.Color('#0a1520'),
      emissiveIntensity: 0.3,
    }),
    body: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a3a4a'),
      metalness: 0.9,
      roughness: 0.3,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4D9A0'),
      metalness: 0.5,
      roughness: 0.4,
      emissive: new THREE.Color('#D4D9A0'),
      emissiveIntensity: 0.2,
    }),
    glow: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4a8a9a'),
      metalness: 0.3,
      roughness: 0.5,
      emissive: new THREE.Color('#4a8a9a'),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
    }),
  }), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Subtle floating animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    
    // Rotate entire group based on progress
    groupRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.15, easedProgress);
    
    // Update screen - transforms from laptop screen to radar dish
    if (screenRef.current) {
      // Position: moves up and tilts back
      screenRef.current.position.y = THREE.MathUtils.lerp(0.8, 1.5, easedProgress);
      screenRef.current.position.z = THREE.MathUtils.lerp(0, -0.3, easedProgress);
      
      // Rotation: from vertical to angled dish
      screenRef.current.rotation.x = THREE.MathUtils.lerp(-0.1, -0.8, easedProgress);
      
      // Scale: becomes wider/dish-like
      screenRef.current.scale.x = THREE.MathUtils.lerp(1.6, 2.2, easedProgress);
      screenRef.current.scale.y = THREE.MathUtils.lerp(1, 1.5, easedProgress);
      screenRef.current.scale.z = THREE.MathUtils.lerp(0.05, 0.15, easedProgress);
    }
    
    // Update base - transforms from keyboard to support structure
    if (baseRef.current) {
      baseRef.current.position.y = THREE.MathUtils.lerp(0, 0.5, easedProgress);
      baseRef.current.scale.x = THREE.MathUtils.lerp(1.8, 0.8, easedProgress);
      baseRef.current.scale.y = THREE.MathUtils.lerp(0.08, 1.5, easedProgress);
      baseRef.current.scale.z = THREE.MathUtils.lerp(1.2, 0.8, easedProgress);
      baseRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI * 0.02, easedProgress);
    }
    
    // Antenna - emerges during transformation
    if (antennaRef.current) {
      antennaRef.current.scale.y = THREE.MathUtils.lerp(0.01, 1, Math.max(0, (easedProgress - 0.3) * 1.5));
      antennaRef.current.position.y = THREE.MathUtils.lerp(0, 2.5, easedProgress);
    }
    
    // Ring - appears around dish
    if (ringRef.current) {
      const ringProgress = Math.max(0, (easedProgress - 0.4) * 1.8);
      ringRef.current.scale.set(ringProgress, ringProgress, ringProgress);
      ringRef.current.rotation.x = Math.PI * 0.5;
      ringRef.current.rotation.z = time * 0.3;
      ringRef.current.position.y = THREE.MathUtils.lerp(0, 1.5, easedProgress);
    }
    
    // Panels - expand outward
    if (panelsRef.current) {
      panelsRef.current.children.forEach((panel, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const expandRadius = THREE.MathUtils.lerp(0, 1.8, easedProgress);
        panel.position.x = Math.cos(angle + time * 0.1) * expandRadius;
        panel.position.z = Math.sin(angle + time * 0.1) * expandRadius;
        panel.position.y = THREE.MathUtils.lerp(0.5, 1.2, easedProgress);
        panel.rotation.y = angle + Math.PI * 0.5;
        panel.rotation.x = THREE.MathUtils.lerp(Math.PI * 0.5, Math.PI * 0.3, easedProgress);
        const panelScale = THREE.MathUtils.lerp(0.01, 1, Math.max(0, (easedProgress - 0.2) * 1.4));
        panel.scale.set(panelScale, panelScale, panelScale);
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Screen / Radar Dish */}
      <mesh ref={screenRef} material={materials.screen}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      
      {/* Base / Support Column */}
      <mesh ref={baseRef} material={materials.body} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      
      {/* Antenna - emerges during transform */}
      <mesh ref={antennaRef} material={materials.accent} position={[0, 1, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1.5, 8]} />
      </mesh>
      
      {/* Rotating ring */}
      <mesh ref={ringRef} material={materials.glow}>
        <torusGeometry args={[1.8, 0.02, 8, 32]} />
      </mesh>
      
      {/* Expandable panels */}
      <group ref={panelsRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} material={materials.body}>
            <boxGeometry args={[0.4, 0.02, 0.6]} />
          </mesh>
        ))}
      </group>
      
      {/* Glow points */}
      {[0, 1, 2].map((i) => (
        <mesh 
          key={`glow-${i}`} 
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 0.5,
            0.9 + easedProgress * 0.5,
            Math.sin((i / 3) * Math.PI * 2) * 0.5
          ]}
          scale={0.05 + easedProgress * 0.03}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#D4D9A0"
            emissive="#D4D9A0"
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
