const INSTAGRAM = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LINKEDIN = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const X = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer id="contact" className="section footer">
      <div className="footer-ghost" aria-hidden="true">
        Incinerate
      </div>

      <div className="footer-grid">
        <div className="footer-col">
          <div className="brand-name">
            <img
              src="/images/Group 1171275092.png"
              alt="INCINERATE"
              className="footer-title-img "
            />
          </div>
          <p className="brand-blurb">
            A flagship entrepreneurship initiative jointly organized by µLearn
            CHN, µLearn PRN and µLearn JUKC.
          </p>
          <div className="social-row">
            <a href="https://www.instagram.com/incinerate.26/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram">
              {INSTAGRAM}
            </a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn">
              {LINKEDIN}
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>
              Nithin Jayakumar<br />
              <a href="tel:+919037195527">+91 9037195527</a><br />
              <a href="mailto:nithinjayakumar2205@gmail.com">
                nithinjayakumar2205@gmail.com
              </a>
            </li>

            <li>
              Sundara Siva Sreerag<br />
              <a href="tel:+918137934994">+91 8137934994</a><br />
              <a href="mailto:remasundhar0@gmail.com">
                remasundhar0@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#why">Why Pitch</a>
            </li>
            <li>
              <a href="#timeline">Phases</a>
            </li>
            <li>
              <a href="#apply">Apply</a>
            </li>
          </ul>
        </div>

        {/* <div className="footer-col">
          <h4>Organisers</h4>
          <ul>
            <li><a href="#organisers">μLearn CHN</a></li>
            <li><a href="#organisers">μLearn PRN</a></li>
            <li><a href="#organisers">μLearn JUKC</a></li>
           
          </ul>
        </div> */}

        <div className="footer-col event-col">
          {/* <h4>Event</h4> */}
          <h4>Location</h4>

          {/* <ul className="event-details">
    <li>
      <span>10 October 2026</span>
    </li>

    <li>
      Jain University Kochi, Kerala
    </li>

  </ul> */}

          <div className="event-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.118847458081!2d76.3656069!3d10.007040799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080b676551a0f9%3A0x7ba2e677814fd36!2sJain%20University%20Kochi!5e0!3m2!1sen!2sin!4v1788113365335!5m2!1sen!2sin"
              title="Jain University Kochi Location"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 INCINERATE · μLearn CHN × μLearn PRN × µLearn JUKC</span>
        <span>Burn the playbook. Build the future.</span>
      </div>
    </footer >
  );
}
