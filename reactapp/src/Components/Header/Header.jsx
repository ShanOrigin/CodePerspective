import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon, FaThLarge } from 'react-icons/fa'
import styles from './Header.module.css'
import FilteredSearch from './SubComponents/JS/Search'
import Offcanvas from './SubComponents/JS/LeftOffCanvas'
import { useNavigationData } from '../../Hooks/useNavigationData'

const BRAND_NAME = 'PersPective'

export default function NavBar(props) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [isThemeModeDark, setIsThemeModeDark] = props.theme
  const navigationData = useNavigationData()

  const toggleTheme = () => {
    const nextTheme = !isThemeModeDark
    setIsThemeModeDark(nextTheme)
    localStorage.setItem('isThemeModeDark', JSON.stringify(nextTheme))
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <nav className={styles.navBar} aria-label="Main Navigation">
          {/* Left: Offcanvas Control & Brand */}
          <div className={styles.leftSection}>
            <button
              type="button"
              className={styles.canvasControlButton}
              onClick={() => setIsOffcanvasOpen(true)}
              aria-label="Open programming topics menu"
              title="Browse Topics"
            >
              <FaThLarge />
            </button>

            <Link to="/" className={styles.brandLink} aria-label="PersPective Home">
              <span className={styles.brandWord}>
                {BRAND_NAME.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`${styles.brandLetter} ${styles[`letter${index}`]}`}
                    style={{ '--char-index': index }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </Link>
          </div>

          {/* Center: Live Search */}
          <div className={styles.centerSection}>
            <FilteredSearch Data={navigationData} />
          </div>

          {/* Right: Theme Toggle */}
          <div className={styles.rightSection}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={isThemeModeDark ? 'Switch to light theme' : 'Switch to dark theme'}
              title={isThemeModeDark ? 'Light mode' : 'Dark mode'}
            >
              {isThemeModeDark ? (
                <FaSun className={styles.themeIcon} style={{ color: '#f59e0b' }} />
              ) : (
                <FaMoon className={styles.themeIcon} style={{ color: '#0284c7' }} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Programming Navigation Drawer */}
      <Offcanvas
        isOpen={isOffcanvasOpen}
        onClose={() => setIsOffcanvasOpen(false)}
      />
    </>
  )
}
