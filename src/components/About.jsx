import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

export default function About() {
  const ref = useReveal()
  const { about } = site
  return (
    <section id="about" ref={ref} className="relative py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div data-reveal className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-2 rounded-[2rem] bg-[conic-gradient(from_0deg,#7c9cff,#5eead4,#7c9cff)] opacity-30 blur-2xl animate-spin-slow" />
          <div className="relative glass rounded-[2rem] p-2">
            <img src={site.photo} alt={site.name} loading="lazy" className="w-full aspect-[4/5] object-cover rounded-[1.6rem]" />
          </div>
        </div>

        <div>
          <div data-reveal><SectionHeading title="About me" /></div>
          {about.paragraphs.map((p) => (
            <p data-reveal key={p} className="text-white/70 leading-relaxed mb-4 max-w-xl">{p}</p>
          ))}
          <dl data-reveal className="mt-6 space-y-3 text-sm max-w-xl">
            {[['Interests', about.interests], ['Current focus', about.currentFocus], ['Goals', about.goals]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-4">
                <dt className="text-mint">{k}</dt><dd className="text-white/70">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {site.cards.map((c) => (
              <div data-reveal key={c.label}>
                <TiltCard className="glass rounded-2xl p-5 h-full">
                  <p className="text-xs tracking-widest text-white/45">{c.label.toUpperCase()}</p>
                  <p className="mt-2 font-display font-medium leading-snug">{c.value}</p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
