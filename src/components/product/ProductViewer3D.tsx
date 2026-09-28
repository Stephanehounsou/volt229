"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function ShoeModel({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += 0.002;
  });

  return (
    <group ref={group} scale={1.2}>
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
        {/* Sole */}
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[2.7, 0.38, 1.15]} />
          <meshStandardMaterial color="#F5F5F0" roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[2.75, 0.14, 1.18]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
        </mesh>
        {/* Upper */}
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.58, 1.5, 8, 16]} />
          <meshStandardMaterial color="#0D0D0F" roughness={0.35} metalness={0.25} />
        </mesh>
        <mesh position={[0.95, 0.1, 0]}>
          <sphereGeometry args={[0.53, 20, 20]} />
          <meshStandardMaterial color="#18181B" roughness={0.3} />
        </mesh>
        {/* Detail slash */}
        <mesh position={[0.15, 0.25, 0.59]} rotation={[0, 0, -0.28]} scale={[1.8, 0.22, 0.08]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
        {/* Laces */}
        {[0.35, 0.0, -0.35].map((_, i) => (
          <mesh key={i} position={[0.25 - i * 0.38, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.75, 10]} />
            <meshStandardMaterial color="#F5F5F0" />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function ProductViewer3D({
  colors,
  selectedColor,
  onSelectColor,
}: {
  colors: { name: string; hex: string }[];
  selectedColor: string;
  onSelectColor: (name: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative w-full aspect-[16/12] md:aspect-[16/10] bg-[#0F0F11] border border-white/[0.06] overflow-hidden rounded-[4px]">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur border border-white/10 text-[11px] tracking-widest uppercase font-display">
          360° • Drag pour tourner
        </span>
        {isDragging && (
          <span className="px-3 py-1.5 bg-[#C6FF3D] text-black text-[11px] tracking-widest uppercase font-display">Rotation</span>
        )}
      </div>

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.6, 2.8], fov: 38 }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 3]} intensity={1.3} />
        <directionalLight position={[-3, 3, -3]} intensity={0.5} color="#C6FF3D" />
        <pointLight position={[0, 2, 1]} intensity={1} color={selectedColor} />
        <ShoeModel color={selectedColor} />
        <OrbitControls enablePan={false} minDistance={2} maxDistance={4} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2.1} autoRotate={!isDragging} autoRotateSpeed={0.8} />
        <Environment preset="city" />
      </Canvas>

      {/* Color switcher */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2.5 bg-[#0D0D0F]/85 backdrop-blur-xl border border-white/10 rounded-full">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => onSelectColor(c.name)}
            className={`relative w-8 h-8 rounded-full transition-all duration-300 border-2 ${
              selectedColor === c.hex ? "border-white scale-110" : "border-white/20 hover:border-white/40"
            }`}
            style={{ background: c.hex }}
            title={c.name}
          >
            {selectedColor === c.hex && (
              <motion.div layoutId="color-ring" className="absolute inset-[-4px] rounded-full border border-white/30" />
            )}
          </button>
        ))}
        <div className="w-px h-5 bg-white/10 mx-1" />
        <span className="text-[11px] tracking-widest uppercase text-white/70 font-display">
          {colors.find((c) => c.hex === selectedColor)?.name}
        </span>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(13,13,15,0.7)_100%)]" />
    </div>
  );
}
