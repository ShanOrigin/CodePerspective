//const CPP = require('./accessDB');
//
import CPP from './accessDB';

const data = {
  Concept: {
    Definition: {
      name: 'Arrays',
      image: 'array.jpg',

      definition: {
        0: { defi: '', vetren: '' },
        1: { defi: ' ', vetren: '' }
      }
    }
  },

  History: {
    Inventors: {
      0: {
        inventor: '',
        image: '',
        contributions: ''
      },
      1: {
        inventor: '',
        image: '',
        contributions: ''
      },
      2: {
        inventor: '',
        image: '',
        contributions: ''
      },
      3: {
        inventor: '',
        image: '',
        contributions: ''
      }
    }
  },
  Types: {
    'One Dimentional Array': {
      image: '',
      info: ''
    },
    'Multi Dimentional Array': {
      image: '',
      info: ''
    }
  },
  'Purpose Importance': {
    'What Is It ?': {
      text: '',
      image: ''
    },
    'Why We Use It ?': {
      text: '',
      image: ''
    },
    Importance: {
      text: '',
      image: ''
    }
  },

  Explanation: {
    'Step 1': {
      text: '',
      image: ''
    },
    'Step 2': {
      text: '',
      image: ''
    },
    'Step 3': {
      text: '',
      image: ''
    }
  },
  Animation: {
    info: '',
    creator: '',

    Code: {
      C: {
        language: 'c_cpp',
        code: ``
      },
      'C++': {
        language: 'c_cpp',
        code: ` `
      },
      Python: {
        language: 'python',
        code: ` `
      },
      Java: {
        language: 'java',
        code: ``
      },
      JavaScript: {
        language: 'javascript',
        code: ``
      },
      CSharp: {
        language: 'csharp',
        code: ``
      }
    }
  },
  Insights: {
    Advantages: {
      0: '',
      1: '',
      2: ''
    },
    Disadvantages: {
      0: '',
      1: ''
    }
  },

  'Use Cases': {
    'Case 0': {
      text: '',
      image: ''
    },
    'Case 1': {
      text: '',
      image: ''
    }
  },

  'Key Aspects': {
    'Time Complexity': {
      'Best Case': {
        text: ''
      },
      'Average Case': {
        text: ''
      },
      'worst Case': {
        text: ''
      }
    },
    'Space Complexity': {
      'Best Case': {
        text: ''
      },
      'Average Case': {
        text: ''
      },
      'worst Case': {
        text: ''
      }
    },
    Limitations: {
      0: {
        text: '',
        image: ''
      },
      1: {
        text: '',
        image: ''
      }
    }
  },

  Scenarios: {
    'Basic Example': {
      explanation: '',
      image: ''
    },
    'Real World': {
      explanation: '',
      image: ''
    }
  },
  Related: {
    'Insert in Array': {
      image: '',
      info: ''
    },
    'Delete in Array': {
      image: '',
      info: ''
    },
    'Concatenate Array': {
      image: '',
      info: ''
    },
    'Merge in Array': {
      image: '',
      info: ''
    },
    'Reverse in Array': {
      image: '',
      info: ''
    },
    'Split Array': {
      image: '',
      info: ''
    }
  }
};

// const doc = {
//   _id: data.Concept.Definition.name,
//   data: data
// };

// CPP.put(doc)
//   .then((result) => {
//     console.log('insert succusfully', result);
//   })
//   .catch((error) => {
//     console.log('some error', error);
//   });

// // Fetch the document by ID
// CPP.get(data.Concept.Definition.name)
//   .then((doc) => {
//     console.log('Fetched document:', doc);
//   })
//   .catch((err) => {
//     console.error('Error fetching document:', err);
//   });
//
//
//   // Example of handling conflicts
CPP.get('Arrays')
  .then((existingDoc) => {
    const updatedDoc = {
      _id: 'Arrays',
      _rev: existingDoc._rev, // Ensure you're updating the latest version
      data: data
    };
    console.log(existingDoc);
    return CPP.put(updatedDoc);
  })
  .then((response) => {
    console.log('Document updated:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
