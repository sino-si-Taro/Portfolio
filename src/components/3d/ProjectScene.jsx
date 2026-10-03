import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import SceneFrame from './SceneFrame'
import Studio from './Studio'
import { projects } from '../../data/projects'
import { state } from '../../lib/state'
import { useIsMobile } from '../../hooks/useIsMobile'

const GAP = 8

function Shape({ i }) {
  switch (i % 4) {
    case 0: return <icosahedronGeometry args={[1.2, 1]} />
    case 1: return <torusKnotGeometry args={[0.8, 0.28, 96, 12]} />
    case 2: return <octahedronGeometry args={[1.35]} />
    default: return <dodecahedronGeometry args={[1.2]} />
  }
}

function Stage({ offset }) {
  const refs = useRef([])
  useFrame((s, dt) => {
    const p = state.showcase * (projects.length - 1)
    const c = s.camera
    c.position.x = THREE.MathUtils.damp(c.position.x, p * GAP, 2.5, dt)
    // cinematic push-in between projects, settle on each one
    c.position.z = THREE.MathUtils.damp(c.position.z, 8 - Math.abs(Math.sin(p * Math.PI)) * 2, 3, dt)
    c.lookAt(c.position.x, 0, 0)
    refs.current.forEach((m, i) => m && (m.rotation.y += dt * (0.2 + (i === Math.round(p) ? 0.3 : 0))))
  })
  return (
    <>
      {projects.map((pr, i) => (
        <group key={pr.id} position={[i * GAP + offset[0], offset[1], 0]}>
          <Float speed={1.5} floatIntensity={0.8}>
            <mesh ref={(el) => (refs.current[i] = el)}>
              <Shape i={i} />
              <meshStandardMaterial color={pr.color} emissive={pr.color} emissiveIntensity={0.25} metalness={0.8} roughness={0.25} flatShading />
            </mesh>
            <mesh rotation={[1.3, 0, 0]}>
              <torusGeometry args={[2.2, 0.01, 8, 100]} />
              <meshBasicMaterial color={pr.color} transparent opacity={0.6} />
            </mesh>
          </Float>
          <pointLight position={[0, 2, 3]} intensity={25} color={pr.color} />
        </group>
      ))}
    </>
  )
}

export default function ProjectScene({ active }) {
  const mobile = useIsMobile()
  return (
    <SceneFrame active={active} camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.35} />
      <Studio />
      <Stage offset={mobile ? [0, 1.8] : [2.8, 0]} />
      <Sparkles count={mobile ? 30 : 80} scale={[GAP * projects.length, 8, 8]} position={[GAP * 1.5, 0, 0]} size={2} speed={0.3} />
    </SceneFrame>
  )
}
