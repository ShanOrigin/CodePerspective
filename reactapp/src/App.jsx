
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'

import './styles/globals.css'
import './App.css'
import NavBar from './Components/Header/Header'
import AppRoutes from './AppRoutes'
import Footer from './Components/Footer/Footer'
import PageTransitionLoader from './Components/common/PageTransitionLoader'
import { ThemeContext } from './Contexts/ThemeContext'

function RouteTransitionWrapper({ children }) {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip loader on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 280) // 280ms smooth route transition

    return () => clearTimeout(timer)
  }, [location.pathname, location.search])

  return (
    <>
      <PageTransitionLoader visible={isLoading} />
      {children}
    </>
  )
}

function App() {
  const [isThemeModeDark, setIsThemeModeDark] = useState(() => {
    const saved = localStorage.getItem('isThemeModeDark')
    return saved !== null ? JSON.parse(saved) : true
  })

  return (
    <ThemeContext.Provider value={{ isThemeModeDark, setIsThemeModeDark }}>
      <div
        className={`root-container ${
          isThemeModeDark ? 'night-mode' : 'day-mode'
        }`}
      >
        <BrowserRouter
          basename="/CodePerspective/"
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <RouteTransitionWrapper>
            <NavBar theme={[isThemeModeDark, setIsThemeModeDark]} />

            <main className="main-container">
              <AppRoutes />
            </main>

            <Footer />
          </RouteTransitionWrapper>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
