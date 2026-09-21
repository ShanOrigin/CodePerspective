import { useState, useEffect, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FaChevronDown, FaCode, FaTimes } from 'react-icons/fa'
import { useNavigationData } from '../../../../Hooks/useNavigationData'
import { decidePageType } from '../../../__navigationData__'
import styles from '../CSS/OperationSidebar.module.css'

/**
 * Operation Guide sidebar shown on operation pages (desktop persistent, mobile drawer).
 * Displays only categories with ≥1 enabled operation.
 * Within each category only enabled operations are rendered as navigation links.
 */
export default function OperationSidebar({ mobileOpen = false, onMobileClose = () => {} }) {
  const data = useNavigationData()
  const location = useLocation()

  // Derive enabled categories from data (memoised to keep a stable reference)
  const enabledCategories = useMemo(() => {
    if (!data) return []
    return Object.entries(data).filter(([key, value]) => {
      if (key === 'Path') return false
      if (!Array.isArray(value)) return false
      return value.some(op => op.enabled)
    })
  }, [data])

  // Start with all sections open
  const [openSections, setOpenSections] = useState(() =>
    enabledCategories.map(([key]) => key)
  )

  // Auto-expand section that matches the current route
  useEffect(() => {
    if (!data) return
    const currentPath = location.pathname.toLowerCase()
    enabledCategories.forEach(([key]) => {
      const catSlug = key.toLowerCase().replace(/\s+/g, '-')
      if (currentPath.includes(catSlug)) {
        setOpenSections(prev => (prev.includes(key) ? prev : [...prev, key]))
      }
    })
  }, [location.pathname, data, enabledCategories])



  if (!data) return null

  const toggleSection = (key, e) => {
    e.stopPropagation()
    setOpenSections(prev =>
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
    )
  }

  const sidebarContent = (
    <div className={styles.sidebarInner}>
      <div className={styles.sidebarHeader}>
        <div className={styles.headerTitle}>
          <FaCode className={styles.headerIcon} />
          <span>Operations Guide</span>
        </div>
        {mobileOpen && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onMobileClose}
            aria-label="Close navigation drawer"
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>

      <nav className={styles.navContainer} aria-label="Algorithm Operations Navigation">
        {enabledCategories.map(([categoryKey, ops]) => {
          const isOpen = openSections.includes(categoryKey)
          const catPath = data.Path?.[categoryKey]?.path
            ? `${data.Path[categoryKey].path}/`
            : ''
          const catSlug = categoryKey.toLowerCase().replace(/\s+/g, '-')
          const enabledOps = ops.filter(op => op.enabled)

          return (
            <div key={categoryKey} className={styles.categoryBlock}>
              <div
                className={styles.categoryHeader}
                onClick={(e) => toggleSection(categoryKey, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleSection(categoryKey, e)
                  }
                }}
                aria-expanded={isOpen}
              >
                <span className={styles.categoryTitle}>{categoryKey}</span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                  <FaChevronDown size={11} />
                </span>
              </div>

              <div className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ''}`}>
                <ul className={styles.operationList}>
                  {enabledOps.map((op) => {
                    const opSlug = op.name.toLowerCase().replace(/\s+/g, '-')
                    const pageParam = decidePageType(data.Path?.[categoryKey]?.page) || '?page=operationpage'
                    const targetRoute = `/programming/${catPath}${catSlug}/${opSlug}${pageParam}`

                    const isCurrent =
                      location.pathname.toLowerCase().endsWith(opSlug) ||
                      (location.pathname + location.search).toLowerCase() === targetRoute.toLowerCase()

                    return (
                      <li key={op.name} className={styles.operationItem}>
                        <NavLink
                          to={targetRoute}
                          className={({ isActive }) =>
                            `${styles.operationLink} ${isActive || isCurrent ? styles.activeLink : ''}`
                          }
                          onClick={() => {
                            if (mobileOpen) onMobileClose()
                          }}
                        >
                          <span className={styles.bulletDot} aria-hidden="true" />
                          <span className={styles.opText}>{op.name}</span>
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Persistent Desktop / Tablet Sidebar */}
      <aside className={styles.desktopSidebar} aria-label="Operations Sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (with backdrop overlay) */}
      {mobileOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}
        aria-label="Mobile Operations Menu"
        aria-hidden={!mobileOpen}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
