import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// The "computer core": glowing distorted core inside a translucent faceted shell + wire cage.
export default function FloatingObject({ scale = 1, color = '#7c9cff', speed = 0.25 }) {
  const g = useRef()
  const [hover, setHover] = useState(false)
  useFrame((_, dt) => {
    g.current.rotation.y += dt * speed
    g.current.rotation.x += dt * speed * 0.35
    const s = THREE.MathUtils.damp(g.current.scale.x, scale * (hover ? 1.12 : 1), 4, dt)
    g.current.scale.setScalar(s)
  })
  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={1}>
      <group ref={g} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial color="#0d1226" metalness={0.9} roughness={0.2} flatShading transparent opacity={0.35} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.42, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
        </mesh>
        <mesh scale={0.6}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.9} distort={0.4} speed={2} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}
