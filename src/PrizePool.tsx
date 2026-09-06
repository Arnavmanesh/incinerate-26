import Reveal from './components/Reveal.jsx';

function SunIcon() {
  return (
    <svg viewBox="0 0 100 100" className="sun-icon-svg">
      <g stroke="#ff5a20" strokeWidth="3">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 360;
          return (
            <line
              key={i}
              x1="50" y1="50" x2="50" y2="10"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </g>
      <circle cx="50" cy="50" r="14" fill="#1a0605" stroke="#ff5a20" strokeWidth="2" />
    </svg>
  );
}

function MarqueeTrack() {
  return (
    <div className="marquee-track">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="marquee-item" key={i}>
          <span className="marquee-txt">50K worth of prizes</span>
          <span className="sun-icon">
            <SunIcon />
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PrizePool() {
  return (
    <section className="prize-section" id="prize-pool" aria-label="Prize pool">
      <Reveal>
        <div className="prize-rule" />

        <div className="marquee-row">
          <MarqueeTrack />
        </div>
        <div className="marquee-row reverse">
          <MarqueeTrack />
        </div>

        <div className="prize-rule" />
      </Reveal>
    </section>
  );
}
