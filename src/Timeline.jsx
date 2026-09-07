import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import SectionHead from './components/SectionHead'
import './Timeline.css'
import TiltedCard from './components/TiltedCard'

gsap.registerPlugin(ScrollTrigger)

const PHASES = [
  {
    phase: 'Phase 0',
    title: 'Registration, Submission & Shortlisting',
    date: 'August 31 – September 13',
    desc: 'Register, submit your idea, and compete for a spot among the top 40 teams.',
    steps: [
      { num: '01', title: 'Register & Submit', desc: 'Register and submit your idea.' },
      { num: '02', title: 'Evaluate', desc: 'Ideas assessed for feasibility, originality & impact.' },
      { num: '03', title: 'Shortlist', desc: 'Top 40 teams advance.' },
      { num: '04', title: 'Refund', desc: 'Non-shortlisted teams receive a 70% refund.' },
    ],
  },
  {
    phase: 'Phase 1',
    title: 'Online Pitching & Shortlisting',
    date: 'September 15 – September 19',
    desc: 'Pitch your solution and compete for the top 20.',
    steps: [
      { num: '01', title: 'Online Pitch', desc: 'Present your solution in 5 minutes.' },
      { num: '02', title: 'Expert Q&A', desc: 'Answer questions and discuss your idea for 5 minutes.' },
      { num: '03', title: 'Shortlist', desc: 'Top 20 teams advance.' },
      { num: '04', title: 'Refund', desc: 'Non-shortlisted teams receive a 50% refund.' },
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Build Phase & Final Shortlisting',
    date: 'September 20 – October 4',
    desc: 'Build, refine, and validate your product with expert guidance.',
    steps: [
      { num: '01', title: 'Build', desc: 'Develop and test your product.' },
      { num: '02', title: 'Mentorship', desc: 'Learn through expert sessions and workshops.' },
      { num: '03', title: 'Refine', desc: 'Improve your product and final pitch.' },
      { num: '04', title: 'Shortlist', desc: 'Top 10 teams advance.' },
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Final Presentation & Community Integration',
    date: 'Final Event: October 10',
    desc: 'Showcase your product and take the next step.',
    steps: [
      { num: '01', title: 'Final Presentation', desc: 'Showcase your product.' },
      { num: '02', title: "Judges' Q&A", desc: "Answer the judges' questions." },
      { num: '03', title: 'Winners & Recognition', desc: 'Get recognised for your innovation.' },
      { num: '04', title: 'Market Support', desc: 'Receive support to take your product forward.' },
    ],
  },
]

export default function Timeline() {
  const sectionRef = useRef(null)
  const fillRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const alignPhaseLines = () => {
      if (!sectionRef.current) return
      const groups = sectionRef.current.querySelectorAll('.phase-steps')
      groups.forEach((steps) => {
        const nums = steps.querySelectorAll('.phase-step-num')
        if (nums.length < 2) return
        const stepsRect = steps.getBoundingClientRect()
        const firstRect = nums[0].getBoundingClientRect()
        const lastRect = nums[nums.length - 1].getBoundingClientRect()
        const firstCenter = firstRect.top + firstRect.height / 2 - stepsRect.top
        const lastCenter = lastRect.top + lastRect.height / 2 - stepsRect.top
        const bottomOffset = stepsRect.height - lastCenter
        steps.style.setProperty('--line-top', `${firstCenter}px`)
        steps.style.setProperty('--line-bottom', `${bottomOffset}px`)
      })
    }

    // Run after layout/fonts settle, and keep in sync on resize.
    const raf = requestAnimationFrame(alignPhaseLines)
    window.addEventListener('resize', alignPhaseLines)
    window.addEventListener('load', alignPhaseLines)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', alignPhaseLines)
      window.removeEventListener('load', alignPhaseLines)
    }
  }, [])

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            end: 'bottom 55%',
            scrub: 0.5,
          },
        },
      )
      gsap.utils.toArray('.phase-node', sectionRef.current).forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 72%',
          onEnter: () => node.classList.add('lit'),
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="timeline" ref={sectionRef} className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Timeline & Phases"
          title="The four-phase burn"
          lede="A real sequence with real dates — follow the burn from registration to the final event."
        />

        <div className="phase-track">
          <div className="phase-rail" aria-hidden="true">
            <span className="phase-rail-bg" />
            <span className="phase-rail-fill" ref={fillRef} />
          </div>

          {PHASES.map((p) => {
            const dotLabel = p.phase.replace(/[^0-9]/g, '').padStart(2, '0')
            return (
              <div key={p.phase} className="phase-node">
                <div className="phase-node-dot">{dotLabel}</div>
                <div className="phase-card">
                  <div className="phase-header-tag">
                    <span className="phase-num">{p.phase}</span>
                    <span className="phase-chip">{p.date}</span>
                  </div>
                  <div className="phase-name">{p.title}</div>
                  <p className="phase-desc">{p.desc}</p>

                  <div className="phase-steps">
                    {p.steps.map((s) => (
                      <div key={s.num} className="phase-step">
                        <span className="phase-step-num">{s.num}</span>
                        <div className="phase-step-copy">
                          <div className="phase-step-title">{s.title}</div>
                          <div className="phase-step-desc">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <span className="phase-spacer" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}