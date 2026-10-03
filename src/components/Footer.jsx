import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05060b]/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div>
          <p className="font-display font-bold">{site.name}</p>
          <p className="text-sm text-white/50">Web & Mobile Developer</p>
        </div>
        <ul className="flex gap-6 text-sm text-white/60">
          {Object.entries(site.socials).map(([k, v]) => (
            <li key={k}><a className="hover:text-white py-2 inline-block" href={v} target="_blank" rel="noreferrer">{k}</a></li>
          ))}
        </ul>
        <p className="text-xs text-white/40">© 2026 {site.name}</p>
      </div>
    </footer>
  )
}
