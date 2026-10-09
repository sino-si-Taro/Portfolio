import { art } from './art'
import mePhoto from './me.png'

// ✏️ EDIT YOUR PERSONAL INFO HERE
export const site = {
  name: 'Rhoel T. Fernando Jr',
  role: 'BSIT STUDENT • WEB & MOBILE DEVELOPER',
  intro:
    'I build interactive digital experiences, mobile applications, and game-based applications with a focus on usability, performance, and creative design.',
  available: true,
  email: 'rhoeltfernando@gmail.com',
  photo: mePhoto,
  socials: {
    GitHub: 'https://github.com/sino-si-Taro',
    // LinkedIn: 'https://linkedin.com/in/your-username',
    Facebook: 'https://facebook.com/rhoeltfernandojr',
  },
  about: {
    paragraphs: [
      "I'm a Bachelor of Science in Information Technology student who enjoys turning ideas into working products — from responsive web apps to Android and game projects.",
      'I like projects where design and engineering meet: interfaces that feel good to use, and code that stays clean as it grows.',
    ],
    interests: 'Interactive web, mobile UI, game development, cultural and educational apps',
    currentFocus: 'Capstone development, testing, and polishing my Godot and Android skills',
    goals: 'Join a team building digital products, and keep shipping projects that people actually use',
  },
  cards: [
    { label: 'Education', value: 'BS Information Technology' },
    { label: 'Specialization', value: 'Web and Mobile Application Development' },
    { label: 'Focus', value: 'Web • Mobile • Game Development' },
  ],
  timeline: [
    { year: '2024', title: 'Started learning programming', text: 'Built first pages with HTML, CSS and JavaScript.' },
    { year: '2025', title: 'Developed web and mobile projects', text: 'Moved into React, PHP/MySQL and Android.' },
    { year: '2026', title: 'Developed DOORS OF IBANAG', text: 'A Godot game for Ibanag language and culture.' },
    { year: '2026', title: 'Capstone development and testing', text: 'Usability testing, fixes and release preparation.' },
  ],
}
