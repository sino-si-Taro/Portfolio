import { art } from './art'

// ✏️ EDIT / ADD PROJECTS HERE. `color` tints the 3D object in the showcase.
export const projects = [
  {
    id: 'doors-of-ibanag',
    number: '01',
    title: 'DOORS OF IBANAG',
    description:
      'A game-based cultural language learning application designed to support Ibanag language learning and cultural preservation.',
    image: art('DOORS OF IBANAG', '#c2410c', '#1c0f2e'),
    tech: ['Godot', 'GDScript', 'Android', 'JSON'],
    features: ['Interactive story', 'Language quizzes', 'Puzzle challenges', 'Audio pronunciation', 'Cultural content', 'Offline learning'],
    github: 'https://play.google.com/apps/testing/com.buidITupDev.doorsofibanag',
    demo: '#',
    color: '#f59e0b',
  }
  // {
  //   id: 'web-app',
  //   number: '02',
  //   title: 'Modern Web Application',
  //   description: 'Placeholder: a responsive web app with authentication, a dashboard and a REST API backend.',
  //   image: art('Modern Web App', '#2563eb', '#0b1020'),
  //   tech: ['React', 'Tailwind CSS', 'PHP', 'MySQL'],
  //   features: ['Responsive dashboard', 'REST API', 'User accounts'],
  //   github: 'https://github.com/your-username/web-app',
  //   demo: '#',
  //   color: '#7c9cff',
  // },
  // {
  //   id: 'mobile-app',
  //   number: '03',
  //   title: 'Mobile Application',
  //   description: 'Placeholder: an Android application with a clean Material interface and local storage.',
  //   image: art('Mobile Application', '#0d9488', '#08141c'),
  //   tech: ['Android', 'Java', 'SQLite', 'Figma'],
  //   features: ['Material UI', 'Offline storage', 'Push-ready'],
  //   github: 'https://github.com/your-username/mobile-app',
  //   demo: '#',
  //   color: '#5eead4',
  // },
  // {
  //   id: 'game',
  //   number: '04',
  //   title: 'Interactive Game',
  //   description: 'Placeholder: a 2D game prototype with levels, scoring and touch controls.',
  //   image: art('Interactive Game', '#9333ea', '#12081f'),
  //   tech: ['Godot', 'GDScript', 'Android'],
  //   features: ['Touch controls', 'Level system', 'Score tracking'],
  //   github: 'https://github.com/your-username/game',
  //   demo: '#',
  //   color: '#c084fc',
  // },
]
