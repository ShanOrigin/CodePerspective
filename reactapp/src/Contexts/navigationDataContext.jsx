import { createContext } from 'react';

const advanceData = {
  Path: {
    Basics: {
      page: 'typespage'
    },

    'Control Flows': { path: 'basics', page: 'operationpage' },
    Strings: { path: 'basics', page: 'operationpage' },
    'Bit Operators': { path: 'basics', page: 'operationpage' },
    'Data Structure': { page: 'typespage' },

    'One Dimensional Array': {
      path: 'data-structure/array',
      page: 'operationpage'
    },
    'Two Dimensional Array': {
      path: 'data-structure/array',
      page: 'operationpage'
    },
    'Singly Linked List': {
      path: 'data-structure/linked-list',
      page: 'operationpage'
    },
    'Doubly Linked List': {
      path: 'data-structure/linked-list',
      page: 'operationpage'
    },
    Stack: { path: 'data-structure', page: 'operationpage' },
    Queue: { path: 'data-structure', page: 'operationpage' },
    'Hash Table': { path: 'data-structure', page: 'operationpage' },
    Alorithms: { path: 'basics', page: 'typespage' },
    Sorting: { path: 'alorithms', page: 'operationpage' }
  },

  Basics: {
    0: 'Data Types',
    1: 'Control Flows',
    2: 'Strings',
    3: 'Bit Operators'
  },
  'Control Flows': {
    0: 'if statement',
    1: 'if else',
    2: 'if else ladder',
    3: 'switch statement',
    4: 'while loop',
    5: 'for loop',
    6: 'do while loop'
  },
  Strings: {
    0: 'Create String',
    1: 'Traverse String',
    2: 'Find in String',
    4: 'Get Length',
    5: 'Concatenate String',
    6: 'Reverse String',
    7: 'Sub String',
    8: 'Sclice String'
  },
  'Data Structure': {
    0: 'Array',
    1: 'Linked List',
    2: 'Stack',
    3: 'Queue',
    4: 'Hash Table',
    5: 'Tree',
    6: 'Tries',
    7: 'Graphs'
  },
  'One Dimensional Array': {
    0: 'Create Array',
    1: 'Linear Search',
    2: 'Binary Search',
    3: 'Merge Array',
    4: 'Concatenate Array',
    5: 'Reverse Array'
  },
  'Two Dimensional Array': {
    0: 'Create 2D Array',
    1: 'Traverse 2D Array',
    2: 'Matrix Addition',
    3: 'Matrix Subtraction',
    4: 'Matrix Multiplication'
  },
  'Singly Linked List': {
    0: 'Create SLL',
    1: 'Traverse in SLL',
    2: 'Insert at Head',
    3: 'Insert in Between',
    4: 'Insert at Tail',
    5: 'Delete at Head',
    6: 'Delete in Between',
    7: 'Delete at Tail',
    8: 'Reverse SLL'
  },
  'Doubly Linked List': {
    0: 'Create DLL',
    1: 'Traverse in DLL',
    2: 'Insert at Head',
    3: 'Insert in Between',
    4: 'Insert at Tail',
    5: 'Delete at Head',
    6: 'Delete in Between',
    7: 'Delete at Tail'
  },
  Stack: {
    0: 'Stack Push',
    1: 'Stack Pop',
    2: 'Custom Stack'
  },
  Queue: {
    0: 'Enqueue',
    1: 'Dequeue',
    2: 'Custom Queue'
  },
  'Hash Table': {
    0: 'Closed Addressing',
    1: 'Open Addressing'
  },
  'Bit Operators': {
    0: 'Number to Binary',
    1: 'Binary to Number',
    2: 'Binary AND',
    3: 'Binary OR',
    4: 'Binary NOT',
    5: 'Binary XOR',
    6: 'Binary Left Shift',
    7: 'Binary Right Shift'
  },
  Alorithms: {
    0: 'Search Alorithms',
    1: 'Sorting Alorithms'
  },
  Sorting: {
    0: 'Bubble Sort',
    1: 'Insertion Sort',
    2: 'Selection Sort',
    3: 'Quick Sort',
    4: 'Shell Sort',
    5: 'Count Sort',
    6: 'Radix Sort'
  }
};

export const contextData = createContext(advanceData);

// NavigationDataProvider component
export const NavigationDataProvider = ({ children }) => {
  return <contextData.Provider>{children}</contextData.Provider>;
};

// Function to calculate URLs (using hooks)
function urlsData(advanceData) {
  const urls = Object.entries(advanceData)
    .slice(1) // Using slice instead of splice to avoid modifying the original array
    .map(([type, object]) => {
      return [
        type,
        Object.entries(object).map(([key, value]) => {
          return `programming/${advanceData.Path[type]?.path ? advanceData.Path[type].path + '/' : ''}${type.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}&${advanceData.Path[type]?.page}`;
        })
      ];
    });

  return urls;
}

// Create context with an initial value of `null` or an empty array
export const urlsContext = createContext(urlsData(advanceData));

// console.log(urlsData(advanceData));

/* below code for validation */

// const urls = Object.entries(advanceData)
//   .splice(1)
//   .map(([type, object]) => {
//     return [
//       type,
//       Object.entries(object).map(([key, value]) => {
//         return `programming/${advanceData.Path[type]?.path ? advanceData.Path[type].path + '/' : ''}${type.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}&${advanceData.Path[type]?.page}`;
//       })
//     ];
//   });
