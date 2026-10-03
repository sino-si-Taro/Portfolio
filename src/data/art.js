// Generates a placeholder image (SVG data URI). Replace with real files, e.g. "/projects/my-app.png"
export const art = (label, a = '#3b4cca', b = '#0e1330') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/><g fill='none' stroke='rgba(255,255,255,.25)'><rect x='60' y='60' width='680' height='380' rx='18'/><path d='M60 130h680'/><circle cx='95' cy='95' r='8'/><circle cx='125' cy='95' r='8'/><circle cx='155' cy='95' r='8'/></g><text x='400' y='300' fill='white' font-size='42' font-family='sans-serif' text-anchor='middle' opacity='.85'>${label}</text></svg>`
  )}`
