import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { scrollToId } from '../lib/scroll'

const links = [['Home', 'home'], ['About', 'about'], ['Projects', 'projects'], ['Skills', 'skills'], ['Contact', 'contact']]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const go = (id) => (e) => { e.preventDefault(); setOpen(false); scrollToId(id) }

  return (
    <header className="fixed top-3 inset-x-3 md:inset-x-6 z-50">
      <nav className={`mx-auto max-w-6xl rounded-full glass px-5 md:px-7 h-14 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-[#05060b]/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,.8)]' : 'bg-transparent border-transparent'}`}>
        <a href="#home" onClick={go('home')} className="font-display font-bold tracking-wide">{site.name}</a>
        <ul className="hidden md:flex gap-8 text-sm text-white/70">
          {links.map(([l, id]) => (
            <li key={id}><a href={`#${id}`} onClick={go(id)} className="hover:text-white transition-colors">{l}</a></li>
          ))}
        </ul>
        <button className="md:hidden w-11 h-11 -mr-2 grid place-items-center" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="relative block w-5 h-3.5">
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>
      {open && (
        <ul className="md:hidden mt-2 mx-auto max-w-6xl rounded-3xl glass bg-[#05060b]/90 p-3">
          {links.map(([l, id]) => (
            <li key={id}><a href={`#${id}`} onClick={go(id)} className="block px-4 py-3.5 rounded-2xl text-white/80 active:bg-white/10">{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  )
}
