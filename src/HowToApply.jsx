import SectionHead from './components/SectionHead.jsx'
import Reveal from './components/Reveal.jsx'
import Button from './components/Button.jsx'
import { motion } from 'framer-motion'

const REGISTRATION_DEADLINE = 'September 16th'

const STEPS = [
  {
    n: '01',
    title: 'IGNITE',
    body: 'Submit your idea and present a clear solution to a real-world problem.',
    note: `REGISTRATION DEADLINE = ${REGISTRATION_DEADLINE}`,
  },
  {
    n: '02',
    title: 'DISCOVER',
    body: 'Ideas are reviewed for originality, feasibility, and impact, with the strongest moving forward.',
    note: null,
  },
  {
    n: '03',
    title: 'BUILD',
    body: 'Turn your idea into a working prototype with mentor guidance, feedback, and refinement.',
    note: null,
  },
  {
    n: '04',
    title: 'SHOWCASE',
    body: 'Present your product through a live demo and pitch before judges, mentors, and industry experts.',
    note: null,
  },
]

function ArrowIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HowToApply() {
  return (
    <section id="apply" className="section">
      <div className="wrap">
        <SectionHead eyebrow="How to Apply" title="THE JOURNEY BEYOND THE IDEA" />

        <div className="apply-track" aria-hidden="true">
          <span className="apply-track-line" />
          {STEPS.map((s) => (
            <span key={s.n} className="apply-track-dot">
              {s.n}
            </span>
          ))}
        </div>

        <div className="apply-grid" style={{ perspective: 1200 }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, rotateX: -90, transformOrigin: 'top' }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.2, type: "spring", bounce: 0.4 }}
              style={{ height: '100%' }}
            >
              <article className="apply-step" style={{ height: '100%' }}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {s.note ? <div className="apply-step-note">{s.note}</div> : null}
              </article>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Button href="https://makemypass.com/event/incinerate26" target="_blank" rel="noopener noreferrer">
            START YOUR APPLICATION
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
