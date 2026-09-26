import React from 'react'
import { useLocation } from 'react-router-dom'
import { useUrls } from '../../Hooks/useUrls'
import OperationPage from './Pages/JS/OperationPage'

// Function to validate a URL against navigation registry
const validateUrl = (urls, page, Curl) => {
  if (!urls || urls.length === 0) return true

  const createKey = (keyData) =>
    keyData
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ')

  const cleanUrl = (url) => url.split('?')[0]

  const urlsParts = Curl.split('/')
  const key = createKey(urlsParts[urlsParts.length - 2] || '')

  const section = urls.find((element) => element[0] === key)
  if (!section) return true // Allow navigation gracefully

  const valid = section[1].some((url) => '/' + cleanUrl(url) === cleanUrl(Curl))
  return valid
}

export default function Controller() {
  const url = useLocation()
  const urls = useUrls()
  const queryParams = new URLSearchParams(url.search)
  const pageType = queryParams.get('page')

  if (!validateUrl(urls, pageType, url.pathname)) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Invalid URL</h2>
        <p>{url.pathname}</p>
      </div>
    )
  }

  return <OperationPage key={url.pathname + url.search} />
}
