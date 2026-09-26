import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaBars, FaPlay } from 'react-icons/fa'
import Animation from './PagesSubComponent/Animation'
import OperationSidebar from './OperationSidebar'
import styles from '../CSS/OperationPage.module.css'

export default function OperationPage() {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Derive readable names from URL path
  const urlSegments = location.pathname.split('/').filter(Boolean)
  const rawAnimationName = urlSegments[urlSegments.length - 1] || 'array'

  // Format title: e.g. "one-dimensional-array" -> "One Dimensional Array"
  const formatTitle = (slug = '') =>
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const operationTitle = formatTitle(rawAnimationName)
  const categoryTitle =
    urlSegments.length > 2 ? formatTitle(urlSegments[urlSegments.length - 2]) : 'Algorithm'

  return (
    <div className={styles.operationLayout}>
      {/* Mobile Top Bar with Drawer Trigger */}
      <div className={styles.mobileTopBar}>
        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open operations guide navigation"
        >
          <FaBars size={15} />
          <span>Operations Menu</span>
        </button>
        <span className={styles.mobileCurrentOp}>{operationTitle}</span>
      </div>

      {/* Left Operation Navigation (20-25% desktop, drawer on mobile) */}
      <OperationSidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      {/* Right Main Visualization Area (75-80%) */}
      <main className={styles.visualizationContent} id="main-content">
        {/* Header Title Area */}
        <header className={styles.contentHeader}>
          <div className={styles.badgeRow}>
            <span className={styles.categoryBadge}>{categoryTitle}</span>
            <span className={styles.visualizerBadge}>
              <FaPlay size={10} style={{ marginRight: '5px' }} />
              Interactive Simulation
            </span>
          </div>
          <h1 className={styles.operationHeading}>{operationTitle}</h1>
        </header>

        {/* Animation & Code Area */}
        <div className={styles.visualizerContainer}>
          <Animation key={rawAnimationName} name={rawAnimationName} />
        </div>
      </main>
    </div>
  )
}
