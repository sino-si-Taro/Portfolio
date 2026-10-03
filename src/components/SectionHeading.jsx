export default function SectionHeading({ title, text, className = '' }) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">{title}</h2>
      {text && <p className="mt-4 max-w-xl text-white/60">{text}</p>}
    </div>
  )
}
