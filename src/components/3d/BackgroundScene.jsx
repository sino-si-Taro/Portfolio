import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SceneFrame from './SceneFrame'
import ParticleField from './ParticleField'
import { state } from '../../lib/state'
import { useIsMobile } from '../../hooks/useIsMobile'

function Drift() {
  const grid = useRef()
  useFrame((s, dt) => {
    const c = s.camera
    c.position.y = THREE.MathUtils.damp(c.position.y, -state.scroll * 10, 3, dt)
    c.position.x = THREE.MathUtils.damp(c.position.x, state.mouse.x * 0.5, 2, dt)
    grid.current.position.set(0, c.position.y - 5, (s.clock.elapsedTime * 0.3) % 1)
  })
  return <gridHelper ref={grid} args={[70, 70, '#2b3a7a', '#171e45']} />
}

// Page-wide fixed backdrop: slow particles + moving grid, camera follows scroll.
export default function BackgroundScene() {
  const mobile = useIsMobile()
  return (
    <SceneFrame camera={{ position: [0, 0, 10], fov: 55 }}>
      <fog attach="fog" args={['#05060b', 8, 32]} />
      <Drift />
      <ParticleField count={mobile ? 250 : 700} spread={[40, 40, 30]} />
    </SceneFrame>
  )
}
