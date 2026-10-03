import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './useIsMobile'

// Fades/slides up every [data-reveal] element inside the returned ref when it scrolls into view.
export function useReveal() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]', ref.current).forEach((el) =>
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      )
    }, ref)
    return () => ctx.revert()
  }, [])
  useLayoutEffect(() => { ScrollTrigger.refresh() }, [])
  return ref
}
