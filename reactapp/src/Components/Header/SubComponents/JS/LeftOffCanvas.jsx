import React, { useEffect } from 'react'
import { FaTimes, FaCode } from 'react-icons/fa'
import styles from '../CSS/LeftOffCanvas.module.css'
import Accordian from './Accordian'

function OffCanvas({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.offCanvas} ${isOpen ? styles.offCanvasOpen : ''}`}
        aria-label="Programming Navigation"
        aria-hidden={!isOpen}
      >
        <div className={styles.offCanvasHeader}>
          <div className={styles.offCanvasTitle}>
            <FaCode style={{ color: 'var(--color-accent)' }} />
            <span>Programming</span>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <FaTimes size={15} />
          </button>
        </div>

        <div className={styles.offCanvasBody}>
          <Accordian closeMenu={onClose} />
        </div>
      </aside>
    </>
  )
}

export default OffCanvas
