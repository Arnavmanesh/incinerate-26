import { useEffect, useMemo, useState } from "react";
import Loader from "./Loader";
import PrizePool from "./PrizePool";
import Partners from "./Partners";
import About from "./About";
import FAQs from "./FAQs";
import BackgroundCanvas from "./BackgroundCanvas";

const HERO_PARTICLE_COUNT = 35;

const navItems = ["About", "Timeline", "Phases", "Guidelines", "Prize Pool", "Partners", "FAQs"];
function Orb({
  variant = 1,
  style = {},
}: {
  variant?: 1 | 2 | 3;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`orb orb-${variant}`}
      style={style}
    />
  );
}

function CountdownCircle({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: 28 }}>
      <div className="countdown-disc">

        <div className="glass-overlay" />
        <span className="countdown-num">{value}</span>
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

function SeparatorDots() {
  return (
    <div className="sep-dots">
      <span className="sep-dot" />
      <span className="sep-dot" />
    </div>
  );
}

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: "00", hours: "00", minutes: "00" };
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const pad = (n: number) => String(n).padStart(2, "0");
    return { days: pad(d), hours: pad(h), minutes: pad(m) };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const target = new Date("2026-10-04T00:00:00+05:30");
  console.log(target);
  console.log(new Date());
  console.log(target.getTime() - Date.now());
  const { days, hours, minutes } = useCountdown(target);
  const [showLoader, setShowLoader] = useState(true);

  const heroParticles = useMemo(
    () =>
      Array.from({ length: HERO_PARTICLE_COUNT }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${Math.random() * 3 + 2}s`,
        delay: `${Math.random() * 4}s`,
      })),
    []
  );

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <BackgroundCanvas />
      <div className="glow-orb one"></div>
      <div className="glow-orb two"></div>
      <main className="incinerate-shell">

        {/* ════════ NAVBAR ════════ */}
        <header className="nav-bar">
          <a href="#" aria-label="Incinerate home" className="nav-logo-link">
            <img src="/images/Group 1171275091.png" alt="Incinerate" className="nav-logo" />
          </a>

          <nav className="nav-links">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="nav-link">
                {item}
              </a>
            ))}
          </nav>

          <a href="#ignite" className="btn-ignite">
            Ignite Project
            <span className="btn-arrow">↗</span>
          </a>
        </header>

        {/* ════════ HERO ════════ */}
        <section className="hero-section">
          <div className="particle-container" aria-hidden>
            {heroParticles.map((p) => (
              <span
                key={p.id}
                className="fire-particle"
                style={{
                  left: p.left,
                  top: p.top,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          {/* µLearn CHN × µLearn PRN */}
          <div className="collab-row">


            <img
              src="/images/logos x.png"
              alt="×"
              className="collab-x"
            />


          </div>


          {/* INCINERATE title + orbs */}
          <div className="title-wrap">
            {/* Orb 1 – large, upper-left near the I */}
            <Orb style={{ width: 102, height: 102, left: -38, top: -76 }} />
            {/* Orb 2 – medium, right side near A */}
            <Orb style={{ width: 68, height: 68, right: 82, top: 51 }} />
            {/* Orb 3 – small, lower-left */}
            <Orb style={{ width: 45, height: 45, left: 123, top: 136 }} />

            <img
              src="/images/Group 1171275092.png"
              alt="INCINERATE"
              className="hero-title-img"
            />
          </div>

          {/* Tagline */}
          <p className="tagline">
            <span className="accent">BURN</span>
            {" THE PLAYBOOK, "}
            <span className="accent">BUILD</span>
            {" THE FUTURE"}
          </p>

          {/* Subtitle */}
          <p className="subtitle">
            A pitching arena where bold ideas are tested, challenged and turned into impact.
          </p>

          {/* Date / Venue */}
          <div className="date-row">
            <div className="date-box">
              <span className="date-label">ON 4TH OCT</span>
              <span className="date-value">2026</span>
            </div>
            <div className="date-divider" />
            <div className="date-box2">
              <span className="date-label">AT JAIN UNIVERSITY</span>
              <span className="date-value">KOCHI</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="countdown-row">
            <CountdownCircle value={days} label="Days" />
            <SeparatorDots />
            <CountdownCircle value={hours} label="Hours" />
            <SeparatorDots />
            <CountdownCircle value={minutes} label="Minutes" />
          </div>

          {/* CTA */}
          <a href="#ignite" id="ignite" className="btn-cta">
            Ignite Project
            <span className="btn-arrow">↗</span>
          </a>

        </section>
        <About />
        <PrizePool />
        <Partners />
        <FAQs />
      </main>
    </>
  );
}