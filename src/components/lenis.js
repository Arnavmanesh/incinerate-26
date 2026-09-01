let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToId(hash) {
  if (!hash || hash === '#' || hash === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.querySelector(hash)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el)
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
