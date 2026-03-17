import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

function FloatingBlob({ position, color, speed, distort, scale }: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#6366f1" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-3, 2, 4]} intensity={1} color="#6366f1" />
          <pointLight position={[3, -2, 2]} intensity={0.6} color="#a855f7" />

          <FloatingBlob position={[1.5, 0.5, 0]} color="#6366f1" speed={1.2} distort={0.4} scale={1.8} />
          <FloatingBlob position={[-1, -0.5, -1]} color="#a855f7" speed={0.8} distort={0.3} scale={1.2} />
          <FloatingBlob position={[0.5, -1, 1]} color="#818cf8" speed={1} distort={0.5} scale={0.8} />

          <Particles />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function LoaderScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#6366f1" />
        <pointLight position={[-2, -2, 2]} intensity={0.5} color="#a855f7" />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh scale={1.5}>
            <icosahedronGeometry args={[1, 4]} />
            <MeshDistortMaterial
              color="#6366f1"
              roughness={0.05}
              metalness={0.95}
              distort={0.5}
              speed={3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
