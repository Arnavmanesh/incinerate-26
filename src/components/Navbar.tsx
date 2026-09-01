const navItems = ["About", "Timeline", "Phases", "Guidelines", "Prize Pool", "Partners", "FAQs"];

export default function Navbar() {
  return (
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

      
    </header>
  );
}
