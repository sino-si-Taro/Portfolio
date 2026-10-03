import { Canvas } from '@react-three/fiber'
import { useIsMobile, prefersReducedMotion } from '../../hooks/useIsMobile'

// Shared Canvas: capped DPR, no AA on mobile, paused when off-screen (active=false).
export default function SceneFrame({ active = true, camera = {}, className = '', children }) {
  const mobile = useIsMobile()
  const reduced = prefersReducedMotion()
  return (
    <Canvas
      className={`scene-fade ${className}`}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      dpr={[1, mobile ? 1.25 : 1.75]}
      camera={{ fov: 45, position: [0, 0, 8], ...camera }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
    >
      {children}
    </Canvas>
  )
}
