import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import styles from '../CSS/Accordian.module.css'
import { useNavigationData } from '../../../../Hooks/useNavigationData'
import { decidePageType } from '../../../__navigationData__'

/**
 * Accordion component for the left off-canvas navigation panel.
 * Only renders categories that have at least one enabled operation.
 * Within each category only enabled operations are listed.
 */
const Accordion = ({ closeMenu }) => {
  const data = useNavigationData()

  const [openSections, setOpenSections] = useState(() => {
    if (!data) return []
    return Object.keys(data).filter(key => key !== 'Path')
  })

  if (!data) return null

  const toggleSection = (key, e) => {
    e.stopPropagation()
    setOpenSections(prev =>
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
    )
  }

  // Only include categories with at least one enabled op
  const paths = Object.entries(data).filter(([key, value]) => {
    if (key === 'Path') return false
    if (!Array.isArray(value)) return false
    return value.some(op => op.enabled)
  })

  return (
    <div className={styles.accordionContainer}>
      {paths.map(([key, ops]) => {
        const isOpen = openSections.includes(key)
        const enabledOps = ops.filter(op => op.enabled)

        return (
          <div key={key} className={styles.accordionItem}>
            <div className={styles.accordionHeader} onClick={(e) => toggleSection(key, e)}>
              <NavLink
                to={`/programming/${data.Path?.[key]?.path ? data.Path[key].path + '/' : ''}${key.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={closeMenu}
                className={styles.categoryTitle}
              >
                {key}
              </NavLink>

              <button
                type="button"
                className={`${styles.arrowButton} ${isOpen ? styles.arrowOpen : ''}`}
                onClick={(e) => toggleSection(key, e)}
                aria-label={`Toggle ${key} section`}
                aria-expanded={isOpen}
              >
                <FaChevronDown size={13} />
              </button>
            </div>

            <div className={`${styles.accordionGrid} ${isOpen ? styles.accordionGridShow : ''}`}>
              <div className={styles.accordionInner}>
                <div className={styles.contentList}>
                  {enabledOps.map((op) => (
                    <NavLink
                      key={op.name}
                      className={styles.itemLink}
                      to={`programming/${data.Path?.[key]?.path ? data.Path[key].path + '/' : ''}${key.toLowerCase().replace(/\s+/g, '-')}/${op.name.toLowerCase().replace(/\s+/g, '-')}${decidePageType(data.Path?.[key]?.page) || ''}`}
                      onClick={closeMenu}
                    >
                      <strong>{op.name}</strong>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
