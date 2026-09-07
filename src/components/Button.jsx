import StarBorder from './StarBorder.jsx'

export default function Button({ children, href = '#apply', className = '', ghost = false, onClick }) {
  function handleClick(e) {
    window.dispatchEvent(
      new CustomEvent('incinerate:spark', { detail: { x: e.clientX, y: e.clientY } }),
    )
    if (onClick) onClick(e)
  }

  return (
    <StarBorder as="div" className="btn-star" color="rgba(255, 86, 45, 0.85)" speed="4s">
      <a href={href} onClick={handleClick} className={`btn ${ghost ? 'btn-ghost' : ''} ${className}`}>
        {children}
      </a>
    </StarBorder>
  )
}
