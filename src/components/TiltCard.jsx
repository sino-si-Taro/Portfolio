import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../hooks/useIsMobile'

// Pointer-driven 3D tilt + lift. Disabled on touch devices and for reduced-motion users.
export default function TiltCard({ children, className = '', max = 7, lift = 6, scale = 1.02 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return
    const el = ref.current
    gsap.set(el, { transformPerspective: 900 })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * max * 2)
      rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
    }
    const enter = () => gsap.to(el, { y: -lift, scale, duration: 0.5, ease: 'power3.out' })
    const leave = () => { rx(0); ry(0); gsap.to(el, { y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
    }
  }, [max, lift, scale])
  return <div ref={ref} className={`tilt ${className}`}>{children}</div>
}
