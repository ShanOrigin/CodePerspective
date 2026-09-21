import { useState, useEffect, useRef, useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import styles from './Hero.module.css'
import HeroVisualizer from './HeroVisualizer'
import BinarySearchVisualizer from './BinarySearchVisualizer'

const HERO_LINES = [
  'Visualize &',
  'Learn with',
  'Different',
  'PersPective',
]

/**
 * Controlled Random Gradient Generator
 * Generates high-contrast, harmonious linear gradients per character
 * Theme-aware: light mode uses deep rich tones; dark mode uses luminous bright tones.
 */
function generateRandomGradients(count) {
  const hues = [190, 210, 235, 260, 280, 310, 335, 355, 165, 220]
  const gradients = []

  for (let i = 0; i < count; i++) {
    // Pick a base hue with random jitter
    const baseHue = hues[Math.floor(Math.random() * hues.length)]
    const hue1 = (baseHue + Math.floor(Math.random() * 25) - 12 + 360) % 360
    const hue2 = (hue1 + 25 + Math.floor(Math.random() * 30)) % 360
    const angle = 125 + Math.floor(Math.random() * 30) // 125deg - 155deg

    // Light theme values (rich, dark contrast: L ~ 30-44%)
    const satLight = 80 + Math.floor(Math.random() * 15)
    const light1 = 32 + Math.floor(Math.random() * 12)
    const light2 = 28 + Math.floor(Math.random() * 10)
    const lightGrad = `linear-gradient(${angle}deg, hsl(${hue1}, ${satLight}%, ${light1}%), hsl(${hue2}, ${satLight}%, ${light2}%))`

    // Dark theme values (vivid, luminous glow: L ~ 65-78%)
    const satDark = 85 + Math.floor(Math.random() * 15)
    const darkL1 = 66 + Math.floor(Math.random() * 12)
    const darkL2 = 72 + Math.floor(Math.random() * 10)
    const darkGrad = `linear-gradient(${angle}deg, hsl(${hue1}, ${satDark}%, ${darkL1}%), hsl(${hue2}, ${satDark}%, ${darkL2}%))`

    gradients.push({ light: lightGrad, dark: darkGrad })
  }

  return gradients
}

export default function Hero() {
  const [typedCharsCount, setTypedCharsCount] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [visualizerLog, setVisualizerLog] = useState('Initializing graph...')
  const [gradientCycle, setGradientCycle] = useState(0)
  const touchStartX = useRef(null)

  const totalChars = HERO_LINES.reduce((sum, line) => sum + line.length, 0)

  // Generate random gradients once per cycle (stays stable during typing)
  const charGradients = useMemo(() => {
    return generateRandomGradients(totalChars + 5)
  }, [gradientCycle, totalChars])

  // Character-by-character typing animation
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setTypedCharsCount(totalChars)
      return
    }

    let timer
    if (typedCharsCount < totalChars) {
      timer = setTimeout(() => {
        setTypedCharsCount((prev) => prev + 1)
      }, 70)
    } else {
      // Pause at fully typed state, then cycle with fresh randomized gradients
      timer = setTimeout(() => {
        setTypedCharsCount(0)
        setGradientCycle((prev) => prev + 1)
      }, 5500)
    }

    return () => clearTimeout(timer)
  }, [typedCharsCount, totalChars])

  // Compute characters mapping
  let globalCharCounter = 0
  let charsRemaining = typedCharsCount

  const renderedLines = HERO_LINES.map((line, lineIndex) => {
    const lineChars = []
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      const currentGlobalIdx = globalCharCounter++
      const isVisible = charsRemaining > 0
      if (isVisible) charsRemaining--

      lineChars.push({
        char,
        isVisible,
        globalIndex: currentGlobalIdx,
        isSpace: char === ' ',
        gradient: charGradients[currentGlobalIdx] || charGradients[0],
      })
    }

    const isLineActive =
      lineChars.some((c) => c.isVisible) &&
      (lineChars.some((c) => !c.isVisible) ||
        (lineIndex === HERO_LINES.length - 1 && charsRemaining === 0))

    return {
      chars: lineChars,
      showCursor: isLineActive,
      isSpecialLine: lineIndex === 3, // "PersPective"
    }
  })

  // Carousel Slides
  const slides = [
    {
      id: 'dijkstra',
      tag: 'Graph Algorithm',
      title: "Dijkstra's Shortest Path",
      render: () => <HeroVisualizer onLogUpdate={setVisualizerLog} />,
    },
    {
      id: 'binary_search',
      tag: 'Search Algorithm',
      title: 'Binary Search (Array)',
      render: () => <BinarySearchVisualizer onLogUpdate={setVisualizerLog} />,
    },
  ]

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) handleNextSlide()
      else handlePrevSlide()
    }
    touchStartX.current = null
  }

  return (
    <section className={styles.heroSection} aria-label="Hero Introduction">
      <div className={styles.heroContainer}>
        {/* Left Hero Content (~40%) */}
        <div className={styles.heroLeft}>
          <div className={styles.headingWrapper} role="heading" aria-level="1">
            {renderedLines.map((lineData, lineIdx) => (
              <div
                key={lineIdx}
                className={`${styles.heroLine} ${
                  lineData.isSpecialLine ? styles.heroLineSpecial : ''
                }`}
              >
                {lineData.chars.map((item, charIdx) => {
                  if (!item.isVisible) return null
                  if (item.isSpace) {
                    return <span key={charIdx} className={styles.heroSpace}>&nbsp;</span>
                  }

                  return (
                    <span
                      key={charIdx}
                      className={`${styles.heroChar} ${
                        lineData.isSpecialLine ? styles.perspectiveChar : ''
                      }`}
                      style={{
                        '--char-grad-light': item.gradient.light,
                        '--char-grad-dark': item.gradient.dark,
                      }}
                    >
                      {item.char}
                    </span>
                  )
                })}
                {lineData.showCursor && (
                  <span className={styles.cursor} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <p className={styles.heroSubtitle}>
            CodePerspective transforms complex programming concepts, abstract algorithms,
            and data structures into clear, step-by-step visual experiences. Explore the logic
            behind the code in real-time.
          </p>
        </div>

        {/* Right Hero Visualization Carousel (~60%) */}
        <div className={styles.heroRight}>
          <div
            className={styles.visualizerCard}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header with Carousel Navigation */}
            <div className={styles.visualizerHeader}>
              <div className={styles.visualizerMeta}>
                <span className={styles.algoTag}>{slides[activeSlide].tag}</span>
                <span className={styles.algoTitle}>{slides[activeSlide].title}</span>
              </div>

              <div className={styles.carouselNav}>
                <button
                  type="button"
                  className={styles.carouselBtn}
                  onClick={handlePrevSlide}
                  aria-label="Previous algorithm visualization"
                  title="Previous Algorithm"
                >
                  <FaChevronLeft />
                </button>

                <div className={styles.carouselDots}>
                  {slides.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      className={`${styles.dot} ${
                        activeSlide === dotIdx ? styles.activeDot : ''
                      }`}
                      onClick={() => setActiveSlide(dotIdx)}
                      aria-label={`Switch to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.carouselBtn}
                  onClick={handleNextSlide}
                  aria-label="Next algorithm visualization"
                  title="Next Algorithm"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            {/* Horizontally sliding viewport */}
            <div className={styles.carouselTrack}>
              <div
                className={styles.carouselSlideContainer}
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, idx) => (
                  <div key={slide.id} className={styles.carouselSlide}>
                    <div className={styles.svgWrapper}>
                      {activeSlide === idx ? slide.render() : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with active status */}
            <div className={styles.visualizerFooter}>
              <span className={styles.footerLabel}>Status:</span>
              <span className={styles.stepLog}>{visualizerLog}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
