import { lazy, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { site } from '../data/site'
import { scrollToId } from '../lib/scroll'
import { prefersReducedMotion } from '../hooks/useIsMobile'
import LazyScene from './3d/LazyScene'
const HeroScene = lazy(() => import('./3d/HeroScene'))

export default function Hero() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.h-line', { y: 48, opacity: 0, filter: 'blur(14px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.12 })
        .fromTo('.h-btn', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, '-=0.6')
        .fromTo('.h-scroll', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.4')
      gsap.to('.h-content', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden">
      <LazyScene className="absolute inset-0 z-0">{(a) => <HeroScene active={a} />}</LazyScene>

      <div className="h-content pointer-events-none relative z-10 mx-auto max-w-7xl px-6 min-h-screen flex items-end md:items-center pb-36 md:pb-0">
        <div className="max-w-xl">
          <p className="h-line text-sm tracking-[0.3em] text-mint mb-4">HELLO, I'M</p>
          <h1 className="h-line font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.02] bg-gradient-to-br from-white via-white to-accent bg-clip-text text-transparent">
            {site.name}
          </h1>
          <p className="h-line mt-5 text-sm md:text-base tracking-[0.18em] text-white/80">{site.role}</p>
          <p className="h-line mt-5 text-white/60 leading-relaxed max-w-md">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToId('projects') }} className="h-btn btn btn-primary">VIEW MY WORK</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact') }} className="h-btn btn btn-ghost">CONTACT ME</a>
          </div>
          {site.available && (
            <p className="h-line mt-8 inline-flex items-center gap-3 text-sm text-white/70">
              <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-mint" /> Available for opportunities
            </p>
          )}
        </div>
      </div>

      <div className="h-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-white/50 pointer-events-none">
        SCROLL TO EXPLORE
        <span className="scroll-line block w-px h-12" />
      </div>
    </section>
  )
}
