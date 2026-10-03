import { lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import { state } from '../lib/state'
import { prefersReducedMotion } from '../hooks/useIsMobile'
import LazyScene from './3d/LazyScene'
const ProjectScene = lazy(() => import('./3d/ProjectScene'))

// Pinned scroll story: the 3D camera glides between projects while text and image slide in.
export default function Showcase() {
  const sec = useRef(null), text = useRef(null), img = useRef(null), first = useRef(true)
  const [i, setI] = useState(0)
  const p = projects[i]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sec.current, start: 'top top', end: `+=${projects.length * 90}%`, pin: true,
        onUpdate: (s) => { state.showcase = s.progress; setI(Math.round(s.progress * (projects.length - 1))) },
      })
      if (!prefersReducedMotion()) {
        gsap.from(text.current.children, { x: -80, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: sec.current, start: 'top 70%', once: true } })
        gsap.from(img.current, { x: 100, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: sec.current, start: 'top 70%', once: true } })
      }
    }, sec)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (prefersReducedMotion()) return
    gsap.fromTo(text.current.children, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07 })
    gsap.fromTo(img.current, { x: 90, opacity: 0, rotateY: -12 }, { x: 0, opacity: 1, rotateY: 0, duration: 1.1, ease: 'expo.out' })
  }, [i])

  return (
    <section id="showcase" ref={sec} className="relative h-screen overflow-hidden">
      <LazyScene className="absolute inset-0">{(a) => <ProjectScene active={a} />}</LazyScene>
      <div className="relative z-10 h-full mx-auto max-w-7xl px-6 pt-20 pb-6 grid md:grid-cols-2 gap-6 md:gap-10 items-center content-center">
        <div className="glass rounded-3xl p-6 md:p-10 bg-[#05060b]/50">
          <div ref={text}>
            <p className="text-xs tracking-widest text-mint">FEATURED PROJECT {p.number} / {String(projects.length).padStart(2, '0')}</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">{p.title}</h2>
            <p className="mt-4 text-white/65 leading-relaxed line-clamp-3 md:line-clamp-none">{p.description}</p>
            <ul className="hidden sm:flex mt-5 flex-wrap gap-x-5 gap-y-1 text-sm text-white/70">
              {p.features.map((f) => <li key={f} className="before:content-['+'] before:mr-1.5 before:text-accent">{f}</li>)}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <div className="mt-6 flex gap-3">
              <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost !min-h-[42px]">GitHub</a>
              <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary !min-h-[42px]">Live Demo</a>
            </div>
          </div>
        </div>
        <div style={{ perspective: 1000 }} className="order-first md:order-none">
          <div ref={img} className="glass rounded-3xl p-2 shadow-2xl">
            <img src={p.image} alt={p.title} className="w-full aspect-video max-h-[24vh] md:max-h-none object-cover rounded-[1.25rem]" />
          </div>
          <div className="mt-4 flex justify-center md:justify-start gap-2" aria-hidden="true">
            {projects.map((x, n) => <span key={x.id} className={`h-1 rounded-full transition-all duration-500 ${n === i ? 'w-10 bg-accent' : 'w-4 bg-white/20'}`} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
