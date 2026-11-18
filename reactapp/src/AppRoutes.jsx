
import { Routes, Route } from 'react-router-dom'

import Home from './Components/Home/Home'

import AboutUs from './Components/Footer/Pages/JS/AboutUs'
import ContactUs from './Components/Footer/Pages/JS/ContactUs'
import Services from './Components/Footer/Pages/JS/Services'
import Suggestions from './Components/Footer/Pages/JS/Suggestions'
import Feedback from './Components/Footer/Pages/JS/Feedback'
import Copyright from './Components/Footer/Pages/JS/Copyright'

import Controller from './Components/Main/Controller'
import { useUrls } from './Hooks/useUrls'


const FOOTER_ROUTES = [
  { path: '/about-us', element: <AboutUs /> },
  { path: '/contact-us', element: <ContactUs /> },
  { path: '/services', element: <Services /> },
  { path: '/suggestions', element: <Suggestions /> },
  { path: '/feedback', element: <Feedback /> },
  { path: '/copyright', element: <Copyright /> },
]


// Normalize generated URLs into React Router paths.
function normalizePath(url) {
  const pathname = String(url)
    .split('?')[0]
    .split('#')[0]
    .trim()

  const normalized = `/${pathname.replace(/^\/+|\/+$/g, '')}`

  return normalized === '/' ? '/' : normalized
}


function NotFound() {
  return (
    <main className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>
    </main>
  )
}


export default function AppRoutes() {
  const urls = useUrls()

  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Programming routes */}
      {Array.isArray(urls) &&
        urls.flatMap(([sectionName, sectionUrls]) =>
          sectionUrls.map((url, index) => (
            <Route
              key={`${sectionName}-${index}`}
              path={normalizePath(url)}
              element={<Controller />}
            />
          ))
        )}

      {/* Footer routes */}
      {FOOTER_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
