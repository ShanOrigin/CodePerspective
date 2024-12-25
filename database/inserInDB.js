//const CPP = require('./accessDB');
import CPP from './accessDB';
const data = {
  Concept: {
    Definition: {
      name: 'Arrays',
      image: 'queen0.jpg',

      definition: {
        0: 'An array is a data structure that holds a collection of elements, typically of the same data type, in a contiguous memory location.',
        1: 'An array is a Container which holds Similar type of data in a contiguous memory location to fast access '
      }
    }
  },

  History: {
    Inventors: {
      0: {
        inventor: 'John von Neumann',
        image: 'jhon-van-neuman.jpg',
        contributions:
          'John von Neumann contributed to the development of the array concept as part of early computer science foundations, allowing efficient data storage and access. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quasi deserunt amet tempora voluptate. Maiores rem, possimus cumque dicta ipsam ratione. Ipsum molestiae, tempora ipsam reiciendis provident quisquam numquam obcaecati excepturi et? Veritatis ipsum neque laborum quisquam aut perferendis voluptatibus aperiam obcaecati suscipit id ducimus pariatur, consequuntur debitis excepturi enim minima Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas praesentium doloremque corporis aut. Accusantium quod esse quo, cupiditate eaque praesentium facilis non ipsum fuga debitis nulla, earum porro odio accusamus? '
      },
      1: {
        inventor: 'John von Neumann',
        image: 'jhon-van-neuman.jpg',
        contributions:
          'John von Neumann contributed to the development of the array concept as part of early computer science foundations, allowing efficient data storage and access. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore enim doloremque quidem aspernatur repellat at unde a nam voluptatibus atque, recusandae modi repellendus ab aperiam quis quas suscipit quod ullam veritatis nostrum, eos placeat nihil! Labore excepturi exercitationem veritatis molestiae eaque voluptatibus porro laboriosam optio distinctio dolores, repudiandae obcaecati ipsa.'
      },
      2: {
        inventor: 'John von Neumann',
        image: 'jhon-van-neuman.jpg',
        contributions:
          'John von Neumann contributed to the development of the array concept as part of early computer science foundations, allowing efficient data storage and access. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quasi deserunt amet tempora voluptate. Maiores rem, possimus cumque dicta ipsam ratione. Ipsum molestiae, tempora ipsam reiciendis provident quisquam numquam obcaecati excepturi et? Veritatis ipsum neque laborum quisquam aut perferendis voluptatibus aperiam obcaecati suscipit id ducimus pariatur, consequuntur debitis excepturi enim minima Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas praesentium doloremque corporis aut. Accusantium quod esse quo, cupiditate eaque praesentium facilis non ipsum fuga debitis nulla, earum porro odio accusamus? '
      },
      3: {
        inventor: 'John von Neumann',
        image: 'jhon-van-neuman.jpg',
        contributions:
          'John von Neumann contributed to the development of the array concept as part of early computer science foundations, allowing efficient data storage and access. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore enim doloremque quidem aspernatur repellat at unde a nam voluptatibus atque, recusandae modi repellendus ab aperiam quis quas suscipit quod ullam veritatis nostrum, eos placeat nihil! Labore excepturi exercitationem veritatis molestiae eaque voluptatibus porro laboriosam optio distinctio dolores, repudiandae obcaecati ipsa.'
      }
    }
  },
  Types: {
    'One Dimentional Array': {
      image: 'cube.png',
      info: 'one dimentional array are arrays which has one dimention means in matrix matrix has any number of column but one one row  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores tempore omnis nam voluptatibus architecto, unde fuga magnam et mollitia earum illum, aspernatur praesentium aliquam. Dolores, quo fugiat rerum error facilis debitis labore. Repudiandae eligendi distinctio aliquid hic fugit minus beatae ex unde doloribus fuga? Perspiciatis id veniam iste veritatis quisquam?'
    },
    'Multi Dimentional Array': {
      image: 'cube.png',
      info: 'multi dimentional arrays are arrays which has more than one dimentionsmeans in matrix matrix has any number row and column Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore hic repellat architecto reiciendis quos fugiat nam dolorum enim, adipisci velit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea maiores debitis quibusdam, esse distinctio doloribus enim accusamus similique ipsa tempora vero corporis illum, nobis, eligendi non. Laboriosam illo ratione asperiores aliquam ducimus aperiam earum qui provident quis, quibusdam repellendus sequi! Sequi sapiente dolore recusandae explicabo aliquid dolor laudantium. Voluptate, officia.'
    }
  },
  'Purpose Importance': {
    'What Is It ?': {
      text: 'An array is a structured way to store multiple elements, which can be accessed by their index position. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque totam maiores molestias facere rerum, similique dolorem optio asperiores cupiditate, veniam provident culpa officiis odio ipsum corrupti? Repellat sunt rem atque blanditiis velit quisquam magnam, voluptates, maiores, qui placeat alias ut!',
      image: 'https://example.com/what-is-array.jpg'
    },
    'Why We Use It ?': {
      text: 'Arrays are used to efficiently manage and organize data, especially useful in situations where a fixed number of elements is involved. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti asperiores a natus iste ea aliquid perferendis nam aliquam eos blanditiis, tempore labore nostrum voluptatum totam? Suscipit tempore harum doloremque illum!',
      image: 'https://example.com/why-use-array.jpg'
    },
    Importance: {
      text: 'Arrays enable quick access to elements by their index and are essential for handling data in programming and algorithm design. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio molestias amet odit commodi sint earum ab dolore animi saepe aperiam!',
      image: 'https://example.com/importance-of-array.jpg'
    }
  },

  Explanation: {
    'Step 1': {
      text: 'Initialize an array with specified elements. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus quo cupiditate totam explicabo exercitationem. Fuga voluptate incidunt dolorum error?',
      image: 'array-sample.png'
    },
    'Step 2': {
      text: 'Access elements using their index values. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, deserunt?',
      image: 'array-sample.png'
    },
    'Step 3': {
      text: 'Modify elements at specific indices as needed. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam vero in voluptatum nam cupiditate, omnis ipsum mollitia laudantium quaerat distinctio?',
      image: 'array-sample.png'
    }
  },
  Animation: {
    info: 'Modify elements at specific indices as needed. Lorem, ipsum dolor sit amet consectetur ad'
  },
  Insights: {
    Advantages: {
      0: 'Efficient access to elements by index.',
      1: 'Useful for storing data of a fixed size.',
      2: 'Enables batch processing of similar data types.'
    },
    Disadvantages: {
      0: 'Fixed size can be limiting.',
      1: 'Inserting or deleting elements requires shifting.'
    }
  },

  'Use Cases': {
    'Case 0': {
      text: 'Used in data processing applications to hold and manipulate data lists. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, facilis. Eaque dolor fugiat esse nulla error voluptatem in! Impedit voluptatem maxime quidem fuga natus. Repellat voluptates soluta laboriosam quibusdam accusamus a dolorum. Cumque quis, nisi maiores dolores esse reprehenderit? Aliquam, molestiae cumque fuga optio aperiam debitis a pariatur sint suscipit.',
      image: 'https://example.com/use-case-1.jpg'
    },
    'Case 1': {
      text: 'Essential for implementing matrices in scientific computing. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ipsa molestias alias consequatur, minus excepturi ad quidem, animi culpa libero harum aut nam commodi laudantium atque neque. Magni, eaque fuga impedit, natus aliquam aspernatur sapiente, qui delectus non sequi eligendi. Blanditiis soluta maiores rerum, ex exercitationem assumenda illo cum dolores eum iure impedit omnis repellendus distinctio dolore alias reiciendis quo?',
      image: 'https://example.com/use-case-2.jpg'
    }
  },

  'Key Aspects': {
    'Time Complexity': {
      'Best Case': {
        text: 'Accessing elements by index - O(1).'
      },
      'Average Case': {
        text: 'Iterating through all elements - O(n).'
      },
      'worst Case': {
        text: 'Inserting or deleting elements requires O(n) shifts.'
      }
    },
    'Space Complexity': {
      'Best Case': {
        text: 'O(n) where n is the number of elements.'
      },
      'Average Case': {
        text: 'O(n) with minimal overhead.'
      },
      'worst Case': {
        text: 'O(n) with memory overhead.'
      }
    },
    Limitations: {
      0: {
        text: 'Fixed size cannot be changed dynamically. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium saepe fuga maiores repellendus distinctio nostrum!',
        image: 'https://example.com/limitations-array.jpg'
      },
      1: {
        text: 'Inefficient for insertion and deletion at arbitrary positions. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eligendi maxime omnis asperiores consequatur delectus, incidunt dolore voluptate ea praesentium.',
        image: 'https://example.com/limitations-array-2.jpg'
      }
    }
  },

  Scenarios: {
    'Basic Example': {
      explanation:
        'Declare an array and access elements by their index. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odit earum nisi nihil soluta dolorum ipsum rem voluptatum quis temporibus cum, ullam eos ad quisquam iusto facere? Vitae eaque autem excepturi enim illum amet dolorum accusantium debitis. Fugit, nemo earum exercitationem nam sit expedita autem.',
      image: 'basic-array.png'
    },
    'Real World': {
      explanation:
        'Arrays are used in databases to store records and in scientific computing for matrix calculations. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id magni quo quaerat non iure! Nulla officiis rem fugiat tempore id illum repellendus quae corrupti autem? Minima ipsam harum exercitationem velit. Vero, reiciendis obcaecati ex officiis quia, culpa ratione modi incidunt, illo delectus corrupti autem magni laboriosam dolorum iste pariatur cupiditate?',
      image: 'real-array.png'
    }
  },
  Related: {
    'Insert in Array': { 0: 0 },
    'Delete in Array': { 0: 0 },
    'Concatenate Array': { 0: 0 },
    'Merge in Array': { 0: 0 },
    'Reverse in Array': { 0: 0 },
    'Split Array': { 0: 0 }
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
