import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Float, MeshDistortMaterial, Text } from '@react-three/drei'
import SceneFrame from './SceneFrame'
import Studio from './Studio'
import { skills } from '../../data/skills'
import { useIsMobile } from '../../hooks/useIsMobile'

const names = Object.values(skills).flat().map((s) => s.name)

function Orbit({ radius }) {
  const g = useRef()
  useFrame((_, dt) => { g.current.rotation.y += dt * 0.15 })
  return (
    <group ref={g} rotation={[0.25, 0, 0.1]}>
      {names.map((n, i) => {
        const a = (i / names.length) * Math.PI * 2
        return (
          <Billboard key={n} position={[Math.cos(a) * radius, ((i % 3) - 1) * 0.55, Math.sin(a) * radius]}>
            <Text fontSize={0.28} color="#d6defc" anchorX="center" anchorY="middle">{n}</Text>
          </Billboard>
        )
      })}
    </group>
  )
}

export default function SkillScene({ active }) {
  const mobile = useIsMobile()
  return (
    <SceneFrame active={active} camera={{ position: [0, 0.6, mobile ? 9 : 7.5] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={30} color="#7c9cff" />
      <Studio />
      <Float speed={1.5} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[0.8, 0.25, mobile ? 64 : 128, 16]} />
          <MeshDistortMaterial color="#5eead4" emissive="#2dd4bf" emissiveIntensity={0.35} metalness={0.7} roughness={0.2} distort={0.25} speed={1.5} />
        </mesh>
      </Float>
      <Orbit radius={mobile ? 2.8 : 3.4} />
    </SceneFrame>
  )
}
