import Reveal from './components/Reveal.jsx'
import SectionHead from './components/SectionHead.jsx'
import { RulerCarousel } from './components/RulerCarousel.jsx'
import './Timeline.css'

const PARTNERS = [
  { id: 1, title: 'μLearn', tagline: 'Community Partner' },
  { id: 2, title: 'Jain University', tagline: 'Venue Partner' },
  { id: 3, title: 'IEDC Kerala', tagline: 'Community Partner' },
]

export default function Partners() {
  return (
    <section id="partners" className="section">
      <div className="wrap">
        <Reveal>
          <SectionHead eyebrow="Our Network" title="Partners" />
        </Reveal>

        <RulerCarousel originalItems={PARTNERS} />

        <div className="partners-actions">
          <a href="#sponsor" className="btn">
            Become a Sponsor &rarr;
          </a>
          <a href="#brochure" className="btn btn-ghost">
            View Brochure
          </a>
        </div>
      </div>
    </section>
  )
}