/**
 * __navigationData__.jsx
 *
 * Legacy data export kept for backward compatibility with components that
 * import `decidePageType` from this file.
 *
 * The canonical navigation data (with enabled/disabled flags) now lives in:
 *   src/Contexts/navigationDataContext.jsx
 */
export default {
  'One Dimensional Arrays': {
    0: 'Creation Array',
    1: 'Linear Search',
    2: 'Binary Search',
    3: 'Insertion Array',
    4: 'Deletion Array',
    5: 'Merge Arrays',
    6: 'Concatenate Arrays',
    7: 'Split Array',
    8: 'Reverse Array',
  },

  Sorting: {
    0: 'Bubble Sort',
    1: 'Insertion Sort',
    2: 'Selection Sort',
    3: 'Quick Sort',
    4: 'Shell Sort',
    5: 'Count Sort',
    6: 'Radix Sort',
  },

  'Two Dimensional Arrays': {
    0: 'Transpose Of 2D Array',
    1: 'Create Array 2D',
    2: 'Search In 2D',
    3: 'Addition Of 2D',
    4: 'Subtraction Of 2D',
    5: 'Multiplication Of 2D',
  },

  'Singly Linked List': {
    0: 'Create SLL',
    1: 'Traverse In SLL',
    2: 'Inset At Head',
    3: 'Insert In Between',
    4: 'Insert At Tail',
    5: 'Detele At Head',
    6: 'Delete In Between',
    7: 'Delete At Tail',
    8: 'Reverse SLL',
  },

  'Doubly Linked List': {
    0: 'Create DLL',
    1: 'Traverse In DLL',
    2: 'D Insert At Head',
    3: 'D Insert In Between',
    4: 'D Insert At Tail',
    5: 'D Detele At Head',
    6: 'D Delete In Between',
    7: 'D Delete At Tail',
  },

  Stack: {
    0: 'Stack Push',
    1: 'Stack Pop',
    2: 'Custom Stack',
  },

  Queue: {
    0: 'En Queue',
    1: 'De Queue',
    2: 'Custom',
  },

  'Hash Table': {
    0: 'Closed Addressing HT',
    1: 'Open Addressing HT',
  },

  'Bit Operators': {
    0: 'Number To Binary',
    1: 'Binary To Number',
    2: 'Binary AND',
    3: 'Binary OR',
    4: 'Binary NOT',
    5: 'Binary XOR',
    6: 'Binary Left Shit',
    7: 'Binary Right Shift',
  },
}

export function decidePageType(page = '') {
  if (page === '') return '?page='
  if (page === 'operationpage') return '?page=operationpage'
  if (page === 'typespage') return '?page=typespage'
}
