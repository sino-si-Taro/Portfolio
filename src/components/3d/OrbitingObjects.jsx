import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Many small cubes drawn with ONE instanced mesh (a single draw call).
export default function OrbitingObjects({ count = 28, radius = 3.2, color = '#7c9cff' }) {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const items = useMemo(
    () => Array.from({ length: count }, () => ({
      a: Math.random() * Math.PI * 2, r: radius + Math.random() * 1.6, y: (Math.random() - 0.5) * 2.6,
      s: 0.06 + Math.random() * 0.14, sp: 0.08 + Math.random() * 0.22, rot: 0.3 + Math.random() * 1.2,
    })),
    [count, radius]
  )
  useFrame((st) => {
    const t = st.clock.elapsedTime
    items.forEach((it, i) => {
      const a = it.a + t * it.sp
      dummy.position.set(Math.cos(a) * it.r, it.y + Math.sin(t * 0.5 + i) * 0.15, Math.sin(a) * it.r)
      dummy.rotation.set(t * it.rot, t * it.rot * 0.7, 0)
      dummy.scale.setScalar(it.s)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, count]} frustumCulled={false}>
      <boxGeometry />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.25} emissive={color} emissiveIntensity={0.3} />
    </instancedMesh>
  )
}
