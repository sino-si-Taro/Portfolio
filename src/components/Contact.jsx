import { lazy, useState } from 'react'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import LazyScene from './3d/LazyScene'
const ContactScene = lazy(() => import('./3d/ContactScene'))

export default function Contact() {
  const ref = useReveal()
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  // Opens the visitor's mail app. To receive messages directly, swap this for Formspree/EmailJS (see README).
  const submit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-40 overflow-hidden">
      <LazyScene className="absolute inset-0 opacity-70 pointer-events-none">{(a) => <ContactScene active={a} />}</LazyScene>
      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div data-reveal>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">LET'S BUILD SOMETHING</h2>
          <p className="mt-5 text-white/65 max-w-md">Have a project, idea, or opportunity? Let's create something together.</p>
          <ul className="mt-8 space-y-3">
            <li><a className="hover:text-accent transition-colors" href={`mailto:${site.email}`}>{site.email}</a></li>
            {Object.entries(site.socials).map(([k, v]) => (
              <li key={k}><a className="text-white/70 hover:text-accent transition-colors" href={v} target="_blank" rel="noreferrer">{k}</a></li>
            ))}
          </ul>
        </div>
        <form data-reveal onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-4 bg-[#05060b]/50">
          <label className="block"><span className="sr-only">Name</span><input className="field" required placeholder="Name" value={f.name} onChange={set('name')} autoComplete="name" /></label>
          <label className="block"><span className="sr-only">Email</span><input className="field" required type="email" placeholder="Email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
          <label className="block"><span className="sr-only">Message</span><textarea className="field resize-none" required rows={5} placeholder="Message" value={f.message} onChange={set('message')} /></label>
          <button type="submit" className="btn btn-primary w-full">SEND MESSAGE →</button>
          {sent && <p className="text-sm text-mint" role="status">Your email app should open with the message ready to send.</p>}
        </form>
      </div>
    </section>
  )
}
