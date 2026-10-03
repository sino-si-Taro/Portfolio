import { Environment, Lightformer } from '@react-three/drei'

// Offline studio lighting (no HDR download) baked once.
export default function Studio({ a = '#7c9cff', b = '#5eead4' }) {
  return (
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={2.2} position={[0, 5, -5]} scale={[12, 4, 1]} color={a} />
      <Lightformer form="ring" intensity={3} position={[-5, 1, 3]} scale={3} color={b} />
      <Lightformer form="rect" intensity={1.2} position={[5, -2, 2]} scale={[4, 4, 1]} color="#ffffff" />
    </Environment>
  )
}
