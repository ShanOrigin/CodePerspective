import React from 'react'
import { TrophySpin } from 'react-loading-indicators'
import styles from './PageTransitionLoader.module.css'

export default function PageTransitionLoader({ visible = true, text = 'LOADING PERSPECTIVE' }) {
  if (!visible) return null

  return (
    <div
      className={styles.loaderBackdrop}
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      <div className={styles.loaderContent}>
        <div className={styles.spinnerContainer}>
          <TrophySpin
            color="var(--color-accent, #4f46e5)"
            size="large"
            text=""
          />
        </div>
        <span className={styles.loadingText}>{text}</span>
      </div>
    </div>
  )
}
