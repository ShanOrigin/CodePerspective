/**
 * urls.jsx — Legacy context shim kept for backward compatibility.
 *
 * URL generation has been consolidated into navigationDataContext.jsx.
 * The UrlsDataProvider here is no longer needed but retained to avoid
 * breaking any import that hasn't been updated yet.
 */
import { createContext } from 'react'
import { useNavigationData } from '../Hooks/useNavigationData'
import { decidePageType } from '../Components/__navigationData__'

function buildUrls(data) {
  return Object.entries(data)
    .filter(([key, value]) => key !== 'Path' && Array.isArray(value))
    .map(([type, ops]) => {
      const pathInfo = data.Path?.[type]
      const basePath = pathInfo?.path ? pathInfo.path + '/' : ''
      const catSlug = type.toLowerCase().replace(/\s+/g, '-')
      const pageParam = decidePageType(pathInfo?.page)
      return [
        type,
        ops.map(op =>
          `programming/${basePath}${catSlug}/${op.name.toLowerCase().replace(/\s+/g, '-')}${pageParam}`
        ),
      ]
    })
}

export const urlsContext = createContext(null)

export const UrlsDataProvider = ({ children }) => {
  const data = useNavigationData()
  const urls = data ? buildUrls(data) : []
  return <urlsContext.Provider value={urls}>{children}</urlsContext.Provider>
}
