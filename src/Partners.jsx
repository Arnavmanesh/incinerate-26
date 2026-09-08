import Reveal from './components/Reveal.jsx'
import SectionHead from './components/SectionHead.jsx'
import { RulerCarousel } from './components/RulerCarousel.jsx'
import './Timeline.css'

const PARTNERS = [
  { id: 1, title: 'Jain University', logo: '/images/jkulogo.png', tagline: 'Venue Partner' },
  { id: 2, title: 'IEDC Kerala', logo: '/images/IEDCLOGO.png', tagline: 'Innovation Partner' },
  { id: 3, title: 'μLearn', logo: '/images/mulearnlogo.png', tagline: 'Community Partner' },
]

export default function Partners() {
  return (
    <section id="partners" className="section">
      <div className="wrap">
        <Reveal>
          <SectionHead eyebrow="Our Network" title="Partners" />
        </Reveal>
        <Reveal delay={0.15}>
          <RulerCarousel originalItems={PARTNERS} />
        </Reveal>

        <Reveal delay={0.25}>
          <div className="partners-actions">
            <a href="#sponsor" className="btn">
              Become a Sponsor &rarr;
            </a>
            <a
              href="/brochure.pdf"
              id="brochure"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              View Brochure
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}