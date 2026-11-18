import { useEffect, useRef } from 'react'
import { FaTimes, FaCode } from 'react-icons/fa'
import styles from '../CSS/LeftOffCanvas.module.css'
import Accordian from './Accordian'

function OffCanvas({ isOpen, onClose }) {
  const asideRef = useRef(null)

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
      // Release focus if a descendant (e.g., NavLink or close button) still holds it
      if (asideRef.current && asideRef.current.contains(document.activeElement)) {
        document.activeElement.blur()
      }
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
        ref={asideRef}
        className={`${styles.offCanvas} ${isOpen ? styles.offCanvasOpen : ''}`}
        aria-label="Programming Navigation"
        inert={!isOpen ? '' : undefined}
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