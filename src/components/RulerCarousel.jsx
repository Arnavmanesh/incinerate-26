import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PITCH = 500

function createInfiniteItems(originalItems) {
  const items = []
  for (let i = 0; i < 3; i++) {
    originalItems.forEach((item, index) => {
      items.push({ ...item, id: `${i}-${item.id}`, originalIndex: index })
    })
  }
  return items
}

function RulerLines({ top = true, totalLines = 100, isDark, stretch = true, activeIndex = 0 }) {
  const lines = []
  const lineSpacing = 100 / (totalLines - 1)

  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0

    const height = isFifth ? 'h-4' : 'h-3'
    const color = isFifth
      ? (isDark ? '#edededcc' : '#171717aa')
      : (isDark ? '#ededed55' : '#17171733')

    const positionClass = top ? '' : 'bottom-0'

    lines.push(
      <div
        key={i}
        className={`absolute w-0.5 ${height} ${positionClass}`}
        style={{ left: `${i * lineSpacing}%`, backgroundColor: color }}
      />
    )
  }

  // Single orange indicator bar — positioned using the active partner's actual DOM rect
  const [indicatorX, setIndicatorX] = useState(0)

  useEffect(() => {
    const updateIndicator = () => {
      const activeLogo = document.getElementById(`carousel-item-${activeIndex}`)
      const container = document.getElementById(`ruler-container-${top ? 'top' : 'bottom'}`)

      if (activeLogo && container) {
        const logoRect = activeLogo.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        // Get exact center of the active logo relative to the ruler container
        const targetX = logoRect.left - containerRect.left + (logoRect.width / 2)
        setIndicatorX(targetX)
      }
    }

    // Small delay to ensure the layout has updated
    const timer = setTimeout(updateIndicator, 0)
    window.addEventListener('resize', updateIndicator)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeIndex, top])

  const positionClass = top ? 'top-0' : 'bottom-0'

  return (
    <div
      id={`ruler-container-${top ? 'top' : 'bottom'}`}
      className="relative h-8 w-full px-4"
      style={{
        flexShrink: 0,
        // backgroundColor: '#f90000',
        ...(stretch ? { width: '100vw' } : {}),
      }}
    >
      {lines}
      {/* Moving orange indicator — the single source of truth for active partner */}
      {/* <div
        className={`absolute w-0.5 h-8 ${positionClass}`}
        style={{
          left: `${indicatorX}px`,
          backgroundColor: '#ff562d',
          boxShadow: '0 0 6px 1px rgba(255,86,45,0.7)',
          transition: 'left 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 2,
        }}
      /> */}
    </div>
  )
}

function RewindIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <polygon points="11 19 2 12 11 5 11 19" />
      <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
  )
}

function FastForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <polygon points="13 19 22 12 13 5 13 19" />
      <polygon points="2 19 11 12 2 5 2 19" />
    </svg>
  )
}

export function RulerCarousel({
  originalItems,
  tone = 'dark',
  autoplay = true,
  autoplayInterval = 1800,
}) {
  const isDark = tone === 'dark'
  const infiniteItems = createInfiniteItems(originalItems)
  const itemsPerSet = originalItems.length
  const totalItems = itemsPerSet * 3
  const startOrigin = Math.floor((itemsPerSet - 1) / 2)

  const [activeIndex, setActiveIndex] = useState(itemsPerSet + startOrigin)
  const [isResetting, setIsResetting] = useState(false)
  const [paused, setPaused] = useState(false)

  const handleItemClick = (newIndex) => {
    if (isResetting) return

    const targetOriginalIndex = newIndex % itemsPerSet
    const possibleIndices = [
      targetOriginalIndex,
      targetOriginalIndex + itemsPerSet,
      targetOriginalIndex + itemsPerSet * 2,
    ]

    let closestIndex = possibleIndices[0]
    let smallestDistance = Math.abs(possibleIndices[0] - activeIndex)

    for (const index of possibleIndices) {
      const distance = Math.abs(index - activeIndex)
      if (distance < smallestDistance) {
        smallestDistance = distance
        closestIndex = index
      }
    }

    setActiveIndex(closestIndex)
  }

  const handlePrevious = () => {
    if (isResetting) return
    setActiveIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    if (isResetting) return
    setActiveIndex((prev) => prev + 1)
  }

  useEffect(() => {
    if (isResetting) return

    let timer = null
    if (activeIndex < itemsPerSet) {
      setIsResetting(true)
      timer = setTimeout(() => {
        setActiveIndex(activeIndex + itemsPerSet)
        setIsResetting(false)
      }, 0)
    } else if (activeIndex >= itemsPerSet * 2) {
      setIsResetting(true)
      timer = setTimeout(() => {
        setActiveIndex(activeIndex - itemsPerSet)
        setIsResetting(false)
      }, 0)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [activeIndex, itemsPerSet, isResetting])

  useEffect(() => {
    if (!autoplay || paused) return

    const id = setInterval(() => {
      setActiveIndex((prev) => prev + 1)
    }, autoplayInterval)

    return () => clearInterval(id)
  }, [autoplay, autoplayInterval, paused])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isResetting) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveIndex((prev) => prev - 1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveIndex((prev) => prev + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isResetting])

  const targetX = -((activeIndex - (totalItems - 1) / 2) * PITCH)
  const currentPage = (activeIndex % itemsPerSet) + 1
  const totalPages = itemsPerSet

  return (
    <div
      className="flex h-full min-h-[440px] w-full flex-col items-center justify-center "
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex h-[200px] w-full flex-col justify-center">
        <div className="flex items-center justify-center">
          <RulerLines top isDark={isDark} activeIndex={activeIndex} />
        </div>
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <motion.div
            className="flex items-center gap-[100px]"
            animate={{ x: targetX }}
            transition={
              isResetting
                ? { duration: 0 }
                : { type: 'spring', stiffness: 260, damping: 20, mass: 1 }
            }
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <motion.button
                  key={item.id}
                  id={`carousel-item-${index}`}
                  onClick={() => handleItemClick(index)}
                  className="flex cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl font-bold tracking-[-0.055em] text-white md:text-6xl"
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={
                    isResetting
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 400, damping: 25 }
                  }
                  style={{ width: '400px' }}
                >
                  <span>{item.title}</span>
                  {item.tagline && (
                    <span className="mt-2 text-xs font-mono tracking-[0.2em] text-[#ff562d] uppercase md:text-sm">
                      {item.tagline}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        <div className="flex items-center justify-center">
          <RulerLines top={false} isDark={isDark} activeIndex={activeIndex} />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4 text-white/70">
        <button
          onClick={handlePrevious}
          disabled={isResetting}
          className="flex cursor-pointer items-center justify-center transition hover:text-[#ff562d]"
          aria-label="Previous item"
        >
          <RewindIcon />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{currentPage}</span>
          <span className="text-sm opacity-55">/</span>
          <span className="text-sm font-medium">{totalPages}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={isResetting}
          className="flex cursor-pointer items-center justify-center transition hover:text-[#ff562d]"
          aria-label="Next item"
        >
          <FastForwardIcon />
        </button>
      </div>
    </div>
  )
}

export default RulerCarousel
