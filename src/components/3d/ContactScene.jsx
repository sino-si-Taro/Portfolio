import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'
import SceneFrame from './SceneFrame'
import { state } from '../../lib/state'
import { useIsMobile } from '../../hooks/useIsMobile'

function Orb() {
  const g = useRef()
  useFrame((_, dt) => {
    g.current.rotation.y += dt * 0.1
    g.current.position.x += (state.mouse.x * 0.6 - g.current.position.x) * Math.min(dt * 2, 1)
    g.current.position.y += (state.mouse.y * 0.4 - g.current.position.y) * Math.min(dt * 2, 1)
  })
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[2.6, 3]} />
        <MeshDistortMaterial color="#7c9cff" wireframe transparent opacity={0.25} distort={0.3} speed={1.2} />
      </mesh>
    </group>
  )
}

export default function ContactScene({ active }) {
  const mobile = useIsMobile()
  return (
    <SceneFrame active={active} camera={{ position: [0, 0, 8] }}>
      <Orb />
      <Sparkles count={mobile ? 30 : 90} scale={[14, 8, 6]} size={2} speed={0.25} color="#5eead4" />
    </SceneFrame>
  )
}
