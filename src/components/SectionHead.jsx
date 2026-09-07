import Reveal from './Reveal.jsx'

export default function SectionHead({ eyebrow, title, lede, center = false, className = '' }) {
  return (
    <Reveal className={`section-head ${center ? 'text-center' : ''} ${className}`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.9]">{title}</h2>
      {lede ? <p className="mt-4 max-w-[46ch] text-dim">{lede}</p> : null}
    </Reveal>
  )
}
