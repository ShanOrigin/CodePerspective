import { createContext } from 'react'
import { decidePageType } from '../Components/__navigationData__'

/**
 * Canonical navigation data source for CodePerspective.
 *
 * Each category entry is an array of operation objects: { name, enabled }.
 * - enabled: true  → animation is implemented and navigable
 * - enabled: false → animation is unimplemented; hidden from UI everywhere
 *
 * Rules enforced here:
 *  • Control Flows — all disabled (ControlFlows/ folder is empty)
 *  • Strings       — all disabled (Strings/ folder is empty)
 *  • Bit Operators — only NumberToBinary, BinaryToNumber, BinaryAND are enabled
 *  • Data Structures and Basics categories intentionally removed
 */
const advanceData = {
  Path: {
    'Bit Operators': { path: 'basics', page: 'operationpage' },

    'One Dimensional Array': {
      path: 'data-structure/array',
      page: 'operationpage',
    },
    'Two Dimensional Array': {
      path: 'data-structure/array',
      page: 'operationpage',
    },
    'Singly Linked List': {
      path: 'data-structure/linked-list',
      page: 'operationpage',
    },
    'Doubly Linked List': {
      path: 'data-structure/linked-list',
      page: 'operationpage',
    },
    Stack: { path: 'data-structure', page: 'operationpage' },
    Queue: { path: 'data-structure', page: 'operationpage' },
    'Hash Table': { path: 'data-structure', page: 'operationpage' },
    Sorting: { path: 'alorithms', page: 'operationpage' },
  },

  'One Dimensional Array': [
    { name: 'Creation Array',     enabled: true  },
    { name: 'Linear Search',      enabled: true  },
    { name: 'Binary Search',      enabled: true  },
    { name: 'Insertion Array',    enabled: true  },
    { name: 'Deletion Array',     enabled: true  },
    { name: 'Merge Arrays',       enabled: true  },
    { name: 'Concatenate Arrays', enabled: true  },
    { name: 'Split Array',        enabled: true  },
    { name: 'Reverse Array',      enabled: true  },
  ],

  Sorting: [
    { name: 'Bubble Sort',    enabled: true },
    { name: 'Insertion Sort', enabled: true },
    { name: 'Selection Sort', enabled: true },
    { name: 'Quick Sort',     enabled: true },
    { name: 'Shell Sort',     enabled: true },
    { name: 'Count Sort',     enabled: true },
    { name: 'Radix Sort',     enabled: true },
  ],

  'Two Dimensional Array': [
    { name: 'Transpose Of 2D Array', enabled: true },
    { name: 'Create Array 2D',       enabled: true },
    { name: 'Search In 2D',          enabled: true },
    { name: 'Addition Of 2D',        enabled: true },
    { name: 'Subtraction Of 2D',     enabled: true },
    { name: 'Multiplication Of 2D',  enabled: true },
  ],

  'Singly Linked List': [
    { name: 'Create SLL',       enabled: true },
    { name: 'Traverse In SLL',  enabled: true },
    { name: 'Inset At Head',    enabled: true },
    { name: 'Insert In Between',enabled: true },
    { name: 'Insert At Tail',   enabled: true },
    { name: 'Detele At Head',   enabled: true },
    { name: 'Delete In Between',enabled: true },
    { name: 'Delete At Tail',   enabled: true },
    { name: 'Reverse SLL',      enabled: true },
  ],

  'Doubly Linked List': [
    { name: 'Create DLL',        enabled: true },
    { name: 'Traverse In DLL',   enabled: true },
    { name: 'D Insert At Head',  enabled: true },
    { name: 'D Insert In Between', enabled: true },
    { name: 'D Insert At Tail',  enabled: true },
    { name: 'D Detele At Head',  enabled: true },
    { name: 'D Delete In Between', enabled: true },
    { name: 'D Delete At Tail',  enabled: true },
  ],

  Stack: [
    { name: 'Stack Push',   enabled: true },
    { name: 'Stack Pop',    enabled: true },
    { name: 'Custom Stack', enabled: true },
  ],

  Queue: [
    { name: 'En Queue', enabled: true },
    { name: 'De Queue', enabled: true },
    { name: 'Custom',   enabled: true },
  ],

  'Hash Table': [
    { name: 'Closed Addressing HT', enabled: true },
    { name: 'Open Addressing HT',   enabled: true },
  ],

  'Bit Operators': [
    { name: 'Number To Binary',   enabled: true  },
    { name: 'Binary To Number',   enabled: true  },
    { name: 'Binary AND',         enabled: true  },
    { name: 'Binary OR',          enabled: false },
    { name: 'Binary NOT',         enabled: false },
    { name: 'Binary XOR',         enabled: false },
    { name: 'Binary Left Shit',   enabled: false },
    { name: 'Binary Right Shift', enabled: false },
  ],
}

// ─────────────────────────────────────────────
// Helper selectors
// ─────────────────────────────────────────────

/**
 * Returns categories that have at least one enabled operation.
 * @param {object} data - The navigation data object
 */
export function getEnabledCategories(data) {
  return Object.entries(data)
    .filter(([key, value]) => {
      if (key === 'Path') return false
      if (!Array.isArray(value)) return false
      return value.some(op => op.enabled)
    })
    .map(([key]) => key)
}

/**
 * Returns flat list of all enabled operations: { category, name }
 * @param {object} data - The navigation data object
 */
export function getAllEnabledOperations(data) {
  const results = []
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'Path' || !Array.isArray(value)) return
    value.forEach(op => {
      if (op.enabled) results.push({ category: key, name: op.name })
    })
  })
  return results
}

// ─────────────────────────────────────────────
// Contexts
// ─────────────────────────────────────────────

export const contextData = createContext(advanceData)

/** NavigationDataProvider component */
export const NavigationDataProvider = ({ children }) => {
  return <contextData.Provider>{children}</contextData.Provider>
}

// ─────────────────────────────────────────────
// URL generation (used by useUrls / Controller)
// ─────────────────────────────────────────────

/**
 * Builds an array of [category, urlArray] pairs for ALL operations (enabled
 * and disabled alike) — this preserves existing route-validation behaviour in
 * Controller.jsx so that disabled routes still fail validation correctly.
 */
function urlsData(data) {
  return Object.entries(data)
    .filter(([key, value]) => key !== 'Path' && Array.isArray(value))
    .map(([type, ops]) => {
      const pathInfo = data.Path[type]
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

export const urlsContext = createContext(urlsData(advanceData))
