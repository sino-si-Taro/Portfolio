import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function ParticleField({ count = 700, spread = [30, 24, 30], size = 0.035, color = '#8fa6ff', speed = 0.01 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < a.length; i++) a[i] = (Math.random() - 0.5) * spread[i % 3]
    return a
  }, [count]) // eslint-disable-line
  useFrame((_, dt) => { ref.current.rotation.y += dt * speed; ref.current.rotation.x += dt * speed * 0.4 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}
