import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styles from '../CSS/Search.module.css'
import { decidePageType } from '../../../__navigationData__'

/**
 * Filters navigation data by search parameter.
 * Only returns operations where enabled === true.
 * Result shape: [[categoryKey, [opName, ...]], ...]
 */
function filterData(data, parameter) {
  if (!data || !parameter.trim()) return []
  const result = []

  for (const [mainKey, ops] of Object.entries(data)) {
    if (mainKey === 'Path') continue
    if (!Array.isArray(ops)) continue

    const matched = ops
      .filter(op => op.enabled && op.name.toLowerCase().includes(parameter.toLowerCase()))
      .map(op => op.name)

    if (matched.length > 0) result.push([mainKey, matched])
  }

  return result
}

function highlightMatch(text, query) {
  if (!query.trim()) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className={styles.highlightedChar}>
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default function FilteredSearch({ Data }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const filteredResults = filterData(Data, query)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          value={query}
          placeholder="Search algorithms, data structures..."
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => {
            if (query.length > 0) setIsOpen(true)
          }}
          aria-label="Search algorithms and data structures"
        />
        {query.length > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            aria-label="Clear search query"
          >
            <FaTimes size={12} />
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className={styles.resultsDropdown}>
          {filteredResults.length > 0 ? (
            filteredResults.map(([mainKey, values], index) => (
              <div key={index} className={styles.resultsGroup}>
                <div className={styles.groupHeader}>{mainKey}</div>
                <ul className={styles.resultsList}>
                  {values.map((value, idx) => (
                    <li key={idx}>
                      <NavLink
                        className={styles.resultLink}
                        onClick={() => {
                          setQuery('')
                          setIsOpen(false)
                        }}
                        to={`programming/${Data?.Path?.[mainKey]?.path ? Data.Path[mainKey].path + '/' : ''}${mainKey.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}${decidePageType(Data?.Path?.[mainKey]?.page) || ''}`}
                      >
                        {highlightMatch(value, query)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              No visualizers matching &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  )
}
