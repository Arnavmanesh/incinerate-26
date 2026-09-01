type Partner = {
  name: string;
};

const partners: Partner[] = [
  { name: "Jain University" },
  { name: "IEDC" },
  { name: "μLearn" },
  { name: "Kindle" },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="partner-logo">
      <span className="partner-name">{partner.name}</span>
    </div>
  );
}

export default function Partners() {
  return (
    <section
      className="partners-section"
      id="partners"
      aria-label="Partners"
    >
      <div className="partners-left">
        <h2>
          Trusted by
          <span className="accent-line">OUR PARTNERS</span>
        </h2>

        <p>
          Together with our partners, we're shaping a platform for
          innovation, collaboration, and lasting impact.
        </p>

        <div className="partner-actions">
          <a
            href="/brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brochure"
          >
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