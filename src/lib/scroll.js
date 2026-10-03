import gsap from 'gsap'
export const scrollToId = (id) =>
  gsap.to(window, { duration: 1.2, ease: 'power3.inOut', scrollTo: { y: id === 'home' ? 0 : `#${id}`, autoKill: true } })
