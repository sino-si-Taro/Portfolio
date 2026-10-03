import { lazy, Suspense, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { state } from './lib/state'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Showcase from './components/Showcase'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

const BackgroundScene = lazy(() => import('./components/3d/BackgroundScene'))

export default function App() {
  useEffect(() => {
    const move = (e) => {
      state.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      state.mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', move, { passive: true })
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => (state.scroll = s.progress) })
    return () => { window.removeEventListener('pointermove', move); st.kill() }
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}><BackgroundScene /></Suspense>
      </div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Showcase />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
