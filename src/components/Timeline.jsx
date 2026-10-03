import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { prefersReducedMotion } from '../hooks/useIsMobile'
import SectionHeading from './SectionHeading'

export default function Timeline() {
  const ref = useReveal()
  const wrap = useRef(null), line = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top 70%', end: 'bottom 70%', scrub: true } })
    })
    return () => ctx.revert()
  }, [])
  return (
    <section id="journey" ref={ref} className="relative py-24 md:py-40">
      <div className="mx-auto max-w-3xl px-6">
        <div data-reveal><SectionHeading title="My journey" /></div>
        <div ref={wrap} className="relative pl-10">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
          <span ref={line} className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent to-mint origin-top" />
          {site.timeline.map((t, n) => (
            <div data-reveal key={n} className="relative pb-12 last:pb-0">
              <span className="absolute -left-10 top-1.5 w-[15px] h-[15px] rounded-full bg-ink border-2 border-accent shadow-[0_0_14px_#7c9cff]" />
              <p className="text-sm text-mint">{t.year}</p>
              <h3 className="mt-1 font-display text-xl md:text-2xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-white/60">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
