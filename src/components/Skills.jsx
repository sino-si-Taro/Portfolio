import { lazy } from 'react'
import { skills } from '../data/skills'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import LazyScene from './3d/LazyScene'
const SkillScene = lazy(() => import('./3d/SkillScene'))

export default function Skills() {
  const ref = useReveal()
  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal><SectionHeading title="Skills" text="The tools I reach for when building for the web, mobile and games." /></div>
        <div data-reveal className="relative h-[320px] md:h-[440px] glass rounded-3xl overflow-hidden mb-12">
          <LazyScene className="absolute inset-0">{(a) => <SkillScene active={a} />}</LazyScene>
        </div>
        {Object.entries(skills).map(([cat, list]) => (
          <div key={cat} className="mb-10">
            <h3 data-reveal className="font-display text-xl mb-4 text-white/90">{cat}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {list.map((s) => (
                <div data-reveal key={s.name}>
                  <TiltCard max={10} className="glass rounded-2xl p-4 flex items-center gap-3">
                    <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-accent/15 text-accent text-xs font-semibold border border-accent/30">{s.icon}</span>
                    <span className="min-w-0">
                      <span className="block font-medium truncate">{s.name}</span>
                      <span className="block text-xs text-white/45">{cat}</span>
                    </span>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
