import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

export default function Projects() {
  const ref = useReveal()
  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal><SectionHeading title="Projects" text="Selected work across web, mobile and game development." /></div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((p) => (
            <div data-reveal key={p.id}>
              <TiltCard max={5} lift={8} scale={1.015} className="card group glass rounded-3xl overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060b] via-transparent to-transparent" />
                  <div className="badges absolute left-4 bottom-4 right-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => <span key={t} className="chip backdrop-blur">{t}</span>)}
                  </div>
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                  <p className="desc mt-3 text-sm leading-relaxed">{p.description}</p>
                  <div className="mt-6 pt-2 flex gap-3 flex-wrap mt-auto">
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost !min-h-[42px]">GitHub</a>
                    <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary !min-h-[42px]">Live Demo</a>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
