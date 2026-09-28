"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function VoltShoe() {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 - 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.2 + Math.sin(t * 1.5) * 0.1;
    }
  });

  // Abstract sneaker shape using primitives for performance (mobile-friendly)
  return (
    <group ref={meshRef} scale={1.1}>
      {/* Sole */}
      <mesh position={[0, -0.6, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.6, 0.35, 1.1]} />
        <meshStandardMaterial color="#F5F5F0" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Midsole volt accent */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[2.65, 0.12, 1.12]} />
        <meshStandardMaterial ref={materialRef} color="#C6FF3D" emissive="#C6FF3D" emissiveIntensity={0.3} roughness={0.2} />
      </mesh>
      {/* Upper main */}
      <mesh position={[0, 0.1, 0]}>
        <capsuleGeometry args={[0.55, 1.4, 8, 16]} />
        <meshStandardMaterial color="#0D0D0F" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Toe box */}
      <mesh position={[0.9, 0.05, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#1A1A1E" roughness={0.35} />
      </mesh>
      {/* Heel */}
      <mesh position={[-0.8, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.9, 0.9]} />
        <meshStandardMaterial color="#111113" roughness={0.5} />
      </mesh>
      {/* Swoosh-like volt slash */}
      <mesh position={[0.1, 0.15, 0.56]} rotation={[0, 0, -0.3]} scale={[1.6, 0.18, 0.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#C6FF3D" emissive="#C6FF3D" emissiveIntensity={0.4} />
      </mesh>
      {/* Laces */}
      {[0.3, 0.0, -0.3].map((z, i) => (
        <mesh key={i} position={[0.2 - i * 0.35, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
          <meshStandardMaterial color="#F5F5F0" />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[520px] md:h-[700px] relative">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 3.2]} fov={45} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} />
        <directionalLight position={[-2, 2, -2]} intensity={0.6} color="#C6FF3D" />
        <pointLight position={[0, 2, 1]} intensity={0.8} color="#C6FF3D" />
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
          <VoltShoe />
        </Float>
        <Environment preset="city" />
      </Canvas>

      {/* Grain + vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(13,13,15,0.8)_100%)]" />
    </div>
  );
}
