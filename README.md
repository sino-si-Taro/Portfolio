# 3D Developer Portfolio
React + Vite + React Three Fiber + drei + GSAP + Tailwind CSS.

## Run locally
    npm install
    npm run dev          # http://localhost:5173

## Build for production
    npm run build        # outputs /dist
    npm run preview      # test the production build
Deploy `dist/` to Netlify, Vercel, GitHub Pages or Cloudflare Pages.

## Replace your content (no component edits needed)
| What | File |
|---|---|
| Name, role, intro, email, socials, About text, info cards, timeline, profile photo | `src/data/site.js` |
| Projects (title, description, image, tech, links, 3D color) | `src/data/projects.js` |
| Skills and categories | `src/data/skills.js` |
| Page title / meta | `index.html` |

Images: put files in `public/` (e.g. `public/projects/doors.png`) and use `'/projects/doors.png'` as the `image` value. Use WebP/AVIF at ~1200px wide for fast loading.
Colors: `tailwind.config.js` (`accent`, `mint`) and `src/index.css`.

## Contact form
It opens the visitor's mail app (`mailto:`). For direct delivery, create a free Formspree/EmailJS form and replace the `submit` function in `src/components/Contact.jsx` with a `fetch` POST.

## Structure
    src/
      App.jsx  main.jsx  index.css
      components/  Navbar Hero About Skills Projects Showcase Timeline Contact Footer TiltCard SectionHeading
        3d/  SceneFrame LazyScene Studio HeroScene BackgroundScene SkillScene ProjectScene ContactScene
             FloatingObject OrbitingObjects ParticleField
      data/  site.js projects.js skills.js art.js
      hooks/ useIsMobile.js useReveal.js
      lib/   state.js scroll.js

## Performance notes
- Each 3D scene is code-split and mounted only near the viewport; it pauses (`frameloop="never"`) when off-screen.
- Orbiting cubes use one instanced mesh. DPR is capped (1.75 desktop / 1.25 mobile), antialiasing and particle counts drop on mobile.
- `prefers-reduced-motion` disables GSAP entrance/tilt animations and renders the 3D scenes on demand.
- The skills orbit labels use drei `<Text>`, which fetches a default font from a CDN at runtime (needs internet). To self-host, pass a `font="/fonts/YourFont.woff"` prop.
