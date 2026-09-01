import SectionHead from './components/SectionHead.jsx'
import Reveal from './components/Reveal.jsx'
import BorderGlow from './components/BorderGlow.jsx'
import TiltedCard from './components/TiltedCard.jsx'
import './Timeline.css'


const INSTAGRAM = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const LINKEDIN = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const ORGS = [
  {
    name: 'µLearn CHN',
    body: 'µLearn CHN is the official µLearn community chapter of the College of Engineering Chengannur (CEC), powered by GTech. It fosters a culture of peer learning and hands-on building through workshops, challenges, and community-led initiatives, helping students turn ideas into practical solutions.',
    instagram: 'https://www.instagram.com/mulearn.chn/',
    linkedin: 'https://www.linkedin.com/company/mulearn-chn/',
  },
  {
    name: 'µLearn JUKC',
    body: 'µLearn JUKC is the official µLearn community chapter of JAIN (Deemed-to-be University), Kochi. It brings together students interested in technology and creation through workshops, hackathons, and community initiatives, providing a platform to explore emerging technologies and build impactful solutions.',
    instagram: 'https://www.instagram.com/mulearn.jukc/',
    linkedin: '#', // NO JUKC LinkedIn URL 
  },
  {
    name: 'µLearn PRN',
    body: 'µLearn PRN is the official µLearn community chapter of the College of Engineering Perumon (CEP). It creates a collaborative space for future-ready engineering students to develop practical skills through technical workshops, challenges, and experiential learning, encouraging them to build, experiment, and grow.',
    instagram: 'https://www.instagram.com/mulearn.prn/',
    linkedin: 'https://www.linkedin.com/company/mulearn-prn/',
  },
]

const ORG_BG =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff562d" stop-opacity="0.1"/><stop offset="0.5" stop-color="#ff3c00" stop-opacity="0.04"/><stop offset="1" stop-color="#0a0908" stop-opacity="0"/></linearGradient></defs><rect width="600" height="360" fill="#0a0908"/><rect width="600" height="360" fill="url(#g)"/></svg>`
  )

function ArrowIcon() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OrgCard({ o }) {
  return (
    <BorderGlow
      className="organizer-glow"
      backgroundColor="#0a0908"
      borderRadius={22}
      glowColor="25 90 62"
      glowIntensity={0.9}
      fillOpacity={0.3}
      colors={['#ff562d', '#ff3c00', '#ffd9b0']}
      edgeSensitivity={26}
      glowRadius={20}
    >
      <TiltedCard
        imageSrc={ORG_BG}
        altText={o.name}
        containerWidth="100%"
        containerHeight="auto"
        imageWidth="100%"
        imageHeight="100%"
        rotateAmplitude={6}
        scaleOnHover={1.02}
        showTooltip={false}
        showMobileWarning={false}
        displayOverlayContent
        overlayContent={
          <div className="organizer-card">
            <div className="organizer-logo">
              <span className="mu">µLearn</span> {o.name.replace('µLearn ', '')}
            </div>

            <p>{o.body}</p>
            <a className="organizer-link" href="#organisers" target="_blank" rel="noopener" style={{ marginBottom: '1.2rem' }}>
              Visit chapter <ArrowIcon />
            </a>
            <div className="social-row">
              <a
                href={o.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                {INSTAGRAM}
              </a>

              {o.linkedin && o.linkedin !== '#' && (
                <a
                  href={o.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  {LINKEDIN}
                </a>
              )}
            </div>

          </div>
        }
      />
    </BorderGlow>
  )
}

export default function Organisers() {
  return (
    <section id="organisers" className="section">
      <div className="wrap">
        <SectionHead eyebrow="About Organisers" title="Three chapters. One fire." />
        <div className="organizer-grid">
          {ORGS.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.12}>
              <OrgCard o={o} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
