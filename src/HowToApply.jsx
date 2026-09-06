import SectionHead from './components/SectionHead.jsx'
import Reveal from './components/Reveal.jsx'
import Button from './components/Button.jsx'
import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '1',
    title: 'Submit',
    body: 'Apply with your idea before the deadline. Keep it sharp — one paragraph, the problem, and why you’re the team to solve it.',
    note: 'Deadline: REGISTRATION_DEADLINE',
  },
  {
    n: '2',
    title: 'Ideation Burn',
    body: 'Refine the core of your idea under mentor scrutiny. Expect the soft spot in your logic to get found — that’s the point.',
    note: null,
  },
  {
    n: '3',
    title: 'The Refinery',
    body: 'Build, validate, and pressure-test with real users and reviewers. Ship a prototype that survives contact with reality.',
    note: null,
  },
  {
    n: '4',
    title: 'The Inferno',
    body: 'Pitch live to judges, investors, and the room that decides what’s next. Leave with a win — or a deal — or both.',
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
        <SectionHead eyebrow="How to Apply" title="Four steps from idea to Inferno" />

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
          <Button href="#apply">
            Start your application
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
