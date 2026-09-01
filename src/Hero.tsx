import { useEffect, useMemo, useState } from "react";

const HERO_PARTICLE_COUNT = 35;

function Orb({
  variant = 1,
  style = {},
}: {
  variant?: 1 | 2 | 3;
  style?: React.CSSProperties;
}) {
  return <span aria-hidden className={`orb orb-${variant}`} style={style} />;
}

function CountdownCircle({ value, label }: { value: string; label: string }) {
  return (
    <div className="flip-unit">
      <div className="flip-num">
        <span>{value}</span>
      </div>
      <span className="flip-label">{label}</span>
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

    if (diff <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const pad = (n: number) => String(n).padStart(2, "0");

    return {
      days: pad(d),
      hours: pad(h),
      minutes: pad(m),
      seconds: pad(s),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Hero() {
  const target = new Date("2026-10-04T00:00:00+05:30");
  const { days, hours, minutes, seconds } = useCountdown(target);

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
        <img src="/images/logos x.png" alt="×" className="collab-x" />
      </div>

      {/* INCINERATE title + orbs */}
      <div className="title-wrap">
        {/* Orb 1 – large, upper-left near the I */}
        <Orb style={{ width: 102, height: 102, left: -30, top: -50 }} />
        {/* Orb 2 – medium, right side near A */}
        <Orb style={{ width: 68, height: 68, right: 82, top: 51 }} />
        {/* Orb 3 – small, lower-left */}
        <Orb style={{ width: 45, height: 45, left: 123, top: 100 }} />

        <img src="/images/Group 1171275092.png" alt="INCINERATE" className="hero-title-img" />
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
          <span className="date-label">ON 10TH OCTOBER</span>
          <span className="date-value">2026</span>
        </div>
        <div className="date-divider" />
        <div className="date-box2">
          <span className="date-label">AT JAIN UNIVERSITY</span>
          <span className="date-value">KOCHI</span>
        </div>
      </div>

      {/* Planet Lava */}
      {/* <div className="planet-wrap" aria-hidden="true">
        <img
          src="/images/planet-lava.png.png"
          alt=""
          className="planet-img"
        />
      </div> */}

      {/* Countdown */}
      <div className="countdown-row">
        <CountdownCircle value={days} label="Days" />
        <SeparatorDots />
        <CountdownCircle value={hours} label="Hours" />
        <SeparatorDots />
        <CountdownCircle value={minutes} label="Minutes" />
        <SeparatorDots />
        <CountdownCircle value={seconds} label="seconds" />
      </div>

      {/* CTA */}
      <a href="#ignite" id="ignite" className="btn-cta">
        Ignite Project
        <span className="btn-arrow">↗</span>
      </a>
    </section>
  );
}
