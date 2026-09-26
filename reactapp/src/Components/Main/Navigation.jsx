import { Routes, Route } from 'react-router-dom'
import Controller from './Controller'
import { useUrls } from '../../Hooks/useUrls'

export default function MainNavigation() {
  const urls = useUrls()

  if (!urls || urls.length === 0) return <p>Loading routes...</p>

  return (
    <Routes>
      {/* Loop through each section */}
      {urls.map(([sectionName, sectionUrls]) =>
        // Loop through each URL in that section
        sectionUrls.map((url, index) => {
          const cleanPath = '/' + url.split('?')[0] // remove ?query and ensure leading slash

          return (
            <Route
              key={`${sectionName}-${index}`}
              path={cleanPath}
              element={<Controller />}
            />
          )
        })
      )}

      {/* Catch-all fallback route */}
    </Routes>
  )
}
