
import { Routes, Route } from 'react-router-dom'
import Controller from './Controller'
import { useUrls } from '../../Hooks/useUrls'

export default function MainNavigation() {
  const urls = useUrls()

  if (!urls || urls.length === 0) {
    return <p>Loading routes...</p>
  }

  return (
    <Routes>
      {urls.flatMap(([sectionName, sectionUrls]) =>
        sectionUrls.map((url, index) => {
          // Remove query parameters from the route path.
          const cleanPath = '/' + url.split('?')[0].replace(/^\/+/, '')

          return (
            <Route
              key={`${sectionName}-${index}`}
              path={cleanPath}
              element={<Controller />}
            />
          )
        })
      )}

      {/* Handle paths that do not match any registered route. */}
      <Route
        path="*"
        element={<p>Page not found.</p>}
      />
    </Routes>
  )
}
