import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import SceneFrame from './SceneFrame'
import Studio from './Studio'
import FloatingObject from './FloatingObject'
import OrbitingObjects from './OrbitingObjects'
import { state } from '../../lib/state'
import { useIsMobile } from '../../hooks/useIsMobile'

function Rings({ color }) {
  const a = useRef(), b = useRef()
  useFrame((_, dt) => { a.current.rotation.z += dt * 0.15; b.current.rotation.y += dt * 0.2 })
  return (
    <>
      <mesh ref={a} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.7, 0.012, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh ref={b} rotation={[0.4, 0, 0.5]}>
        <torusGeometry args={[3.5, 0.008, 8, 120]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.4} />
      </mesh>
    </>
  )
}

// Mouse parallax + scroll-driven camera pull-back and spin.
function Rig({ children, position }) {
  const g = useRef()
  useFrame((s, dt) => {
    const p = Math.min(window.scrollY / window.innerHeight, 1)
    const c = s.camera
    c.position.x = THREE.MathUtils.damp(c.position.x, state.mouse.x * 0.8, 3, dt)
    c.position.y = THREE.MathUtils.damp(c.position.y, state.mouse.y * 0.5, 3, dt)
    c.position.z = THREE.MathUtils.damp(c.position.z, 8 + p * 3, 3, dt)
    c.lookAt(0, 0, 0)
    g.current.rotation.y = p * 1.2
  })
  return <group ref={g} position={position}>{children}</group>
}

export default function HeroScene({ active }) {
  const mobile = useIsMobile()
  return (
    <SceneFrame active={active} camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#5eead4" />
      <Studio />
      <Rig position={mobile ? [0, 1.2, 0] : [2.6, 0, 0]}>
        <FloatingObject scale={mobile ? 0.75 : 1} />
        <OrbitingObjects count={mobile ? 12 : 28} radius={mobile ? 2.4 : 3.2} />
        <Rings color="#7c9cff" />
        <Sparkles count={mobile ? 25 : 70} scale={[9, 6, 6]} size={2} speed={0.3} color="#aab8ff" />
        <ContactShadows position={[0, -2.6, 0]} opacity={0.4} blur={2.6} far={4} frames={1} />
      </Rig>
    </SceneFrame>
  )
}
