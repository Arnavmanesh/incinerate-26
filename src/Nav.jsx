import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrollToId } from './components/lenis.js'

const LINKS = [
  ['why', 'Why Pitch'],
  ['organisers', 'Organisers'],
  ['timeline', 'Phases'],
  ['apply', 'Apply'],
  ['partners', 'Partners'],
  ['faqs', 'FAQs'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = LINKS.map(([id]) => document.getElementById(id))
    const heroEl = document.querySelector('.hero-section')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            // If the hero is in view, reset to 'top' so no link is underlined
            if (en.target.classList.contains('hero-section')) {
              setActive('top')
            } else {
              setActive(en.target.id)
            }
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    if (heroEl) io.observe(heroEl)
    els.forEach((el) => el && io.observe(el))

    return () => io.disconnect()
  }, [])

  // Close mobile menu when clicking anywhere outside the navbar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  function go(e, id) {
    e.preventDefault()
    setOpen(false)
    scrollToId(`#${id}`)
  }

  return (
    <header id="nav" ref={navRef} className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">

        {/* Logo */}
        <a className="brand" href="#top" onClick={(e) => go(e, 'top')}>
          <img
            className="brand-logo"
            src="/images/Group 1171275091.png"
            alt="Incinerate"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              onClick={(e) => go(e, id)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Apply Button */}
        <a
          href="#apply"
          className="nav-apply"
          onClick={(e) => go(e, 'apply')}
        >
          Apply Now
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {LINKS.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
              >
                {label}
              </a>
            ))}

            <a
              href="#apply"
              className="mobile-apply"
              onClick={(e) => go(e, 'apply')}
            >
              Apply Now
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}