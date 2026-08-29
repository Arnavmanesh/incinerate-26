type Partner = { name: string; color: string; path: string };

const partners: Partner[] = [
  { name: "FoxHub", color: "#ff5a1f", path: "M12 2L2 12l10 10 10-10z" },
  { name: "Amara", color: "#2b6bd9", path: "circle" },
  { name: "Kyan", color: "#a13bd9", path: "M12 2a5 5 0 100 10 5 5 0 000-10zM4 22a8 8 0 0116 0" },
  { name: "Earth", color: "#3fae6a", path: "circle" },
  { name: "ZooTV", color: "#7a5cff", path: "M4 8h16v10H4z" },
  { name: "Sohylic", color: "#ff3d6b", path: "M12 21s-8-5-8-11a4 4 0 018-2 4 4 0 018 2c0 6-8 11-8 11z" },
  { name: "Livo", color: "#3fbf7f", path: "M12 2C7 6 4 10 4 14a8 8 0 0016 0c0-4-3-8-8-12z" },
  { name: "Vocity", color: "#ff7a3d", path: "circle" },
  { name: "Treva", color: "#2bb3a3", path: "M4 4h7v7H4zM13 13h7v7h-7z" },
  { name: "Ideaa", color: "#ffb02e", path: "M9 21h6M12 3a6 6 0 00-3 11c0 1 .5 2 1 3h4c.5-1 1-2 1-3a6 6 0 00-3-11z" },
  { name: "Aven", color: "#6a3bd9", path: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z" },
  { name: "Hexa", color: "#ffb02e", path: "M12 2l9 5v10l-9 5-9-5V7z" },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="partner-logo">
      <span className="partner-icon">
        <svg viewBox="0 0 24 24">
          {partner.path === "circle" ? (
            <circle cx="12" cy="12" r="9" fill={partner.color} />
          ) : (
            <path d={partner.path} fill={partner.color} />
          )}
        </svg>
      </span>
      <span className="partner-name">{partner.name}</span>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="partners-section" id="partners" aria-label="Partners">
      <div className="partners-left">
        <h2>
          Trusted by
          <span className="accent-line">OUR PARTNERS</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </p>
        <div className="partner-actions">
          <a href="#" className="btn-brochure">
            View Brochure
          </a>
          <a href="#" className="btn-cta">
            Become a Sponsor
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>

      <div className="partners-grid">
        {partners.map((p) => (
          <PartnerLogo key={p.name} partner={p} />
        ))}
      </div>
    </section>
  );
}
