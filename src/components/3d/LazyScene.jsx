import { Suspense, useEffect, useRef, useState } from 'react'

// Mounts the (lazy) 3D scene only when near the viewport, and pauses it when scrolled away.
export default function LazyScene({ className = '', children }) {
  const ref = useRef(null)
  const [near, setNear] = useState(false)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setNear(true); setActive(e.isIntersecting) },
      { rootMargin: '200px' }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}>
      {near && <Suspense fallback={null}>{typeof children === 'function' ? children(active) : null}</Suspense>}
    </div>
  )
}
