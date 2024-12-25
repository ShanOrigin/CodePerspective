import { CanvasHandler } from './Source/Components/Canvas.js';
import {
  waitForLength,
  clearCanvas,
  createButton,
  canvasFunction
} from './Source/Utilities/utilities.js';

console.log('canvas script loaded Successfully');

// Declare the object with all properties initialized to null
const ANIMATION_FUNCTION = {
  ONE_D_ARRAY: null,
  TWO_D_ARRAY: null,
  LINKED_LIST: null
  // STACK: null,
  // QUEUE: null,
  // HASH_TABLE: null,
};

/*
// Immediately invoked async function to dynamically import modules and assign them to object properties
(async () => {
    try {
        ANIMATION_FUNCTION.ONE_D_ARRAY = await import('./DSA/Array/__OneDimensional_Imports__.js') ;
        ANIMATION_FUNCTION.TWO_D_ARRAY = await import('./DSA/Array/__TwoDimensional_Imports__.js') ;
        ANIMATION_FUNCTION.LINKED_LIST = await import('./DSA/LinkedList/__Linked_List_Imports__.js') ;
        // Uncomment and use these lines as needed
        // ANIMATION_FUNCTION.STACK = (await import('./DSA/Stack/__StackOperation_Imports__.js')).default;
        // ANIMATION_FUNCTION.QUEUE = (await import('./DSA/Queue/__QueueOperation_Imports__.js')).default;
        // ANIMATION_FUNCTION.HASH_TABLE = (await import('./DSA/HashTable/__HTOperation_Imports__.js')).default;



    } catch (error) {
        console.error('Error importing modules:', error);
    }
})();
*/

/**
 * Iterates through the array of stored operations and attaches event listeners to corresponding buttons.
 * When a button is clicked, it initializes the module associated with the operation and toggles the canvas accordingly.
 *
 * Each operation object should have the following properties:
 * - id: The ID of the button corresponding to the operation.
 * - type: The type of the module to be initialized (e.g., "array", "array2D", "SLL", "DLL", "stack", "queue").
 * - functorName: The name of the function to be executed.
 */

async function getCurrentFunction(
  REQUESTED_MODULE_TYPE,
  REQUESTED_MODULE_FUNCTION
) {
  try {
    console.log(`Requested Module Type: ${REQUESTED_MODULE_TYPE}`);
    console.log(`Requested Function: ${REQUESTED_MODULE_FUNCTION}`);
    switch (REQUESTED_MODULE_TYPE) {
      case 'array':
      case 'sorts':
        if (
          ANIMATION_FUNCTION.ONE_D_ARRAY &&
          REQUESTED_MODULE_FUNCTION in ANIMATION_FUNCTION.ONE_D_ARRAY
        ) {
          return ANIMATION_FUNCTION.ONE_D_ARRAY[REQUESTED_MODULE_FUNCTION];
        }
        break;

      case 'array2D':
        if (
          ANIMATION_FUNCTION.TWO_D_ARRAY &&
          REQUESTED_MODULE_FUNCTION in ANIMATION_FUNCTION.TWO_D_ARRAY
        ) {
          return ANIMATION_FUNCTION.TWO_D_ARRAY[REQUESTED_MODULE_FUNCTION];
        }
        break;

      case 'LL':
        if (
          ANIMATION_FUNCTION.LINKED_LIST &&
          REQUESTED_MODULE_FUNCTION in ANIMATION_FUNCTION.LINKED_LIST
        ) {
          return ANIMATION_FUNCTION.LINKED_LIST[REQUESTED_MODULE_FUNCTION];
        }
        break;

      case 'stack':
      case 'queue':
      case 'HT':
        return null;

      default:
        console.log('Requested module type not supported.');
        break;
    }
    return null; // Default return value if no match found
  } catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * Toggles the disabled state of all buttons in the document.
 *
 * @param {boolean} disabled - If true, disables all buttons; otherwise, enables all buttons.
 */

// Function to enable/disable all buttons
function toggleButtons(btn) {
  // const buttons = document.querySelectorAll('button');
  const button = document.getElementById(btn);

  button.disabled = true;

  // Enable the buttons after 5 seconds
  setTimeout(() => {
    button.disabled = false;
  }, 5000); // 5 seconds delay
}

let canvasHandler = null;
let isRunning = false;

/**
 * Toggles canvas creation and destruction based on the canvas state and provided parameters.
 *
 * @param {string} canvasID - The ID of the canvas element.
 * @param {function} canvasFunction - The function to be executed after canvas creation.
 * @param {string} functorName - The name of the function to be executed.
 * @param {string} structureType - The type of canvas to be created.
 */

window.run = false;

async function toggleCanvas(
  canvasID,
  runningFunction,
  functorName,
  structureType
) {
  try {
    canvasID = canvasID + 'Canvas';

    if (canvasHandler) {
      if (canvasHandler.canvasExists && window.run) {
        canvasHandler.abort = true;

        await destroyCanvas(canvasID);
        // Optional: Toggle buttons if necessary
        // Optional: toggleButtons(functorName);

        canvasHandler = null;
        isRunning = false;
      }
    } else {
      if (!isRunning) {
        canvasHandler = new CanvasHandler();

        let arrayLength = 0;
        /*
                if (["sorts"].includes(structureType)) {
                    arrayLength = await waitForLength({canvas : canvasHandler , umin : 0, umax : 0});
                }
*/
        await canvasHandler.delay();

        await createAndSetupCanvas(
          canvasID,
          structureType,
          functorName,
          arrayLength
        );
        await canvasHandler.delay();

        setupCanvasButtons();
        canvasFunction(canvasHandler, false);

        // Uncomment this block if you need code display functionality
        //   handleCodeDisplay(canvasHandler, structureType, functorName);

        if (canvasHandler.canvasExists && !isRunning) {
          await canvasHandler.delay({ time: 300 });
          if (typeof canvasFunction === 'function') {
            await runningFunction({ canvas: canvasHandler });
            console.log('hi queen');
          }
          isRunning = !isRunning;
          window.run = true;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Destroys the canvas and waits for the destruction process to complete.
 *
 * @param {string} canvasID - The ID of the canvas element to be destroyed.
 * @returns {Promise} - A promise that resolves when the canvas is destroyed.
 */
async function destroyCanvas(canvasID) {
  return new Promise((resolve, reject) => {
    try {
      canvasHandler.destroyCanvas({
        canvasID: canvasID,
        paper: canvasHandler.paper
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Creates and sets up the canvas with the provided parameters.
 *
 * @param {string} canvasID - The ID of the canvas element.
 * @param {string} structureType - The type of canvas to be created.
 * @param {string} functorName - The name of the function to be executed.
 * @param {number} arrayLength - The length of the array (if applicable).
 */
async function createAndSetupCanvas(
  canvasID,
  structureType,
  functorName,
  arrayLength
) {
  canvasHandler.createCanvas({
    canvasID: canvasID,
    structureType: structureType,
    functorName: functorName,
    ArrayLength: arrayLength
  });
}

/**
 * Sets up the buttons on the canvas.
 */
function setupCanvasButtons() {
  canvasHandler.resetButton = createButton({
    canvas: canvasHandler,
    x: canvasHandler.canvasWidth - canvasHandler.rectWidth * 1.25,
    y: 5,
    colorCode: 3,
    id: 'reset',
    textContent: 'Reset',
    padding: 10
  });

  canvasHandler.playButton = createButton({
    canvas: canvasHandler,
    x: canvasHandler.canvasWidth - canvasHandler.rectWidth * 1.25,
    y: canvasHandler.resetButton.rect.attr('height') * 1.22,
    colorCode: 2,
    id: 'play',
    textContent: 'Play',
    maxWidth: canvasHandler.resetButton.maxWidth,
    padding: 10
  });
  canvasHandler.playButton.addClickAction(() => {
    canvasHandler.isPaused = false;
    canvasHandler.pauseButton.enableButton();
    canvasHandler.playButton.enableButton();
  });

  canvasHandler.pauseButton = createButton({
    canvas: canvasHandler,
    x: canvasHandler.canvasWidth - canvasHandler.rectWidth * 1.25,
    y: canvasHandler.resetButton.rect.attr('height') * 2.26,
    colorCode: 1,
    id: 'pause',
    textContent: 'Pause',
    maxWidth: canvasHandler.resetButton.maxWidth,
    padding: 10
  });
  canvasHandler.pauseButton.addClickAction(() => {
    canvasHandler.isPaused = true;
    canvasHandler.resetButton.disableButton();
  });
}

/**
 * Handles code display functionality.
 * Uncomment and implement if needed.
 *
 * @param {CanvasHandler} canvasHandler - The canvas handler instance.
 * @param {string} structureType - The type of structure (e.g., "array").
 * @param {string} functorName - The name of the function to be executed.
 */

function handleCodeDisplay(canvasHandler, structureType, functorName) {
  const modulePaths = {
    array: './DSA/Array/OneDimensional/TextCodeFiles',
    sorts: './DSA/Array/ArraySorts/TextCodeFiles',
    array2D: './DSA/Array/TwoDimensional/TextCodeFiles',
    SLL: './DSA/LinkedList/Singly_Linked_List/TextCodeFiles',
    DLL: './DSA/LinkedList/Doubly_Linked_List/TextCodeFiles',
    stack: './DSA/Stack/__StackOperation_Imports__.js',
    queue: './DSA/Queue/__QueueOperation_Imports__.js',
    HT: './DSA/HashTable/__HTOperation_Imports__.js'
  };
  const code = document.getElementById('Array-Code');
  code.style.display = 'block';
  code.style.display = 'flex';

  code.style.height = canvasHandler.canvasHeight + 'px';

  // Get references to the select element and the textarea container
  const languageSelect = document.getElementById('languageSelect');
  const codeContainer = document.getElementById('Array-Code');

  // Add event listener to the select element
  languageSelect.addEventListener('change', async function () {
    // Get the selected option value
    const selectedLanguage = this.value;

    // Read the file corresponding to the selected language
    const filePath =
      modulePaths[structureType] +
      '/' +
      functorName +
      '/' +
      functorName +
      '.' +
      selectedLanguage;
    const fileContents = (await readFile(filePath)) + '';

    // Remove previous CodeMirror instance
    const previousCodeMirror = codeContainer.querySelector('.CodeMirror');
    if (previousCodeMirror) {
      previousCodeMirror.CodeMirror.toTextArea();
      previousCodeMirror.remove();
    }

    const previousTextArea = document.getElementById('code-area');

    if (previousTextArea) {
      // previousTextArea.value ='' ;
      previousTextArea.remove();

      console.log('hi remove textarea');
    }

    // Create new textarea element
    const newTextArea = document.createElement('textarea');
    newTextArea.id = 'code-area';
    newTextArea.value = fileContents;

    // Insert new textarea into container
    codeContainer.appendChild(newTextArea);

    // Initialize new CodeMirror instance
    initializeCodeMirror();
  });
}

/**
 * Initializes a CodeMirror editor for the code area.
 *
 * @returns {object} - The CodeMirror editor instance.
 */

function initializeCodeMirror() {
  const editor = CodeMirror.fromTextArea(document.getElementById('code-area'), {
    mode: 'text/x-csrc',
    theme: 'default',
    autofocus: false,
    readOnly: true
  });
  return editor;
}

/**
 * Asynchronously reads the content of a file from the specified file path.
 *
 * @param {string} filePath - The path to the file to be read.
 * @returns {string} - The content of the file as a string, or an empty string if an error occurs.
 */

async function readFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      //throw new Error('Failed to load file');
      console.log(
        `Failed to load file: ${response.status} ${response.statusText}`
      );
      return ''; // Return
    }
    return await response.text();
  } catch (error) {
    console.log(error);
    return ''; // Return empty string if there's an error
  }
}

const FUNCTION_STORAGE = [
  // Array operations
  {
    id: 'CreationArray',
    type: 'array'
    // Description: Operation to create a new array.
  },
  {
    id: 'LinearSearch',
    type: 'array'
    // Description: Operation to perform linear search on an array.
  },
  {
    id: 'BinarySearch',
    type: 'array'
    // Description: Operation to perform binary search on a sorted array.
  },
  {
    id: 'InsertionArray',
    type: 'array'
    // Description: Operation to insert an element into an array.
  },
  {
    id: 'DeletionArray',
    type: 'array'
    // Description: Operation to delete an element from an array.
  },
  {
    id: 'MergeArrays',
    type: 'array'
    // Description: Operation to merge two arrays.
  },
  {
    id: 'ConcatenateArrays',
    type: 'array'
    // Description: Operation to concatenate two arrays.
  },
  {
    id: 'SplitArray',
    type: 'array'
    // Description: Operation to split an array.
  },
  {
    id: 'ReverseArray',
    type: 'array'
    // Description: Operation to reverse the elements of an array.
  },

  // Sorting algorithms
  {
    id: 'BubbleSort',
    type: 'sorts'
    // Description: Operation to perform bubble sort algorithm.
  },

  {
    id: 'InsertionSort',
    type: 'sorts'
    // Description: Operation to perform insertion sort algorithm.
  },
  {
    id: 'SelectionSort',
    type: 'sorts'
    // Description: Operation to perform selection sort algorithm.
  },

  {
    id: 'QuickSort',
    type: 'sorts'
    // Description: Operation to perform quick sort algorithm.
  },

  {
    id: 'ShellSort',
    type: 'sorts'
    // Description: Operation to perform shell sort algorithm.
  },
  {
    id: 'CountSort',
    type: 'sorts'
    // Description: Operation to perform count sort algorithm.
  },

  {
    id: 'RadixSort',
    type: 'sorts'
    // Description: Operation to perform radix sort algorithm.
  },

  // 2D Array operations
  {
    id: 'TransposeOf2DArray',
    type: 'array2D'
    // Description: Operation to Transpose  a 2D array.
  },
  {
    id: 'CreateArray2D',
    type: 'array2D'
    // Description: Operation to create a 2D array.
  },
  {
    id: 'SearchIn2D',
    type: 'array2D'
    // Description: Operation to search an element in a 2D array.
  },
  {
    id: 'AdditionOf2D',
    type: 'array2D'
    // Description: Operation to perform addition of two 2D arrays.
  },
  {
    id: 'SubtractionOf2D',
    type: 'array2D'
    // Description: Operation to perform subtraction of two 2D arrays.
  },
  {
    id: 'MultiplicationOf2D',
    type: 'array2D'
    // Description: Operation to perform multiplication of two 2D arrays.
  },

  // Singly Linked List operations
  {
    id: 'CreateSLL',
    type: 'SLL'
    // Description: Operation to create a singly linked list.
  },
  {
    id: 'TraverseInSLL',
    type: 'SLL'
    // Description: Operation to traverse a singly linked list.
  },
  {
    id: 'InsetAtHead',
    type: 'SLL'
    // Description: Operation to insert a node at the head of a singly linked list.
  },
  {
    id: 'InsertInBetween',
    type: 'SLL'
    // Description: Operation to insert a node in between nodes of a singly linked list.
  },
  {
    id: 'InsertAtTail',
    type: 'SLL'
    // Description: Operation to insert a node at the tail of a singly linked list.
  },
  {
    id: 'DeteleAtHead',
    type: 'SLL'
    // Description: Operation to delete a node at the head of a singly linked list.
  },
  {
    id: 'DeleteInBetween',
    type: 'SLL'
    // Description: Operation to delete a node in between nodes of a singly linked list.
  },
  {
    id: 'DeleteAtTail',
    type: 'SLL'
    // Description: Operation to delete a node at the tail of a singly linked list.
  },
  {
    id: 'ReverseSLL',
    type: 'SLL'
    // Description: Operation to reverse a singly linked list.
  },

  // Doubly Linked List operations
  {
    id: 'CreateDLL',
    type: 'DLL'
    // Description: Operation to create a doubly linked list.
  },
  {
    id: 'TraverseInDLL',
    type: 'DLL'
    // Description: Operation to traverse a doubly linked list.
  },
  {
    id: 'DInsertAtHead',
    type: 'DLL'
    // Description: Operation to insert a node at the head of a doubly linked list.
  },
  {
    id: 'DInsertInBetween',
    type: 'DLL'
    // Description: Operation to insert a node in between nodes of a doubly linked list.
  },
  {
    id: 'DInsertAtTail',
    type: 'DLL'
    // Description: Operation to insert a node at the tail of a doubly linked list.
  },
  {
    id: 'DDeteleAtHead',
    type: 'DLL'
    // Description: Operation to delete a node at the head of a doubly linked list.
  },
  {
    id: 'DDeleteInBetween',
    type: 'DLL'
    // Description: Operation to delete a node in between nodes of a doubly linked list.
  },
  {
    id: 'DDeleteAtTail',
    type: 'DLL'
    // Description: Operation to delete a node at the tail of a doubly linked list.
  },

  // Stack operations
  {
    id: 'StackPush',
    type: 'stack'
    // Description: Operation to push an element onto a stack.
  },
  {
    id: 'StackPop',
    type: 'stack'
    // Description: Operation to pop an element from a stack.
  },
  {
    id: 'CustomStack',
    type: 'stack'
    // Description: Custom stack operation.
  },

  // Queue operations
  {
    id: 'EnQueue',
    type: 'queue'
    // Description: Operation to enqueue an element into a queue.
  },
  {
    id: 'DeQueue',
    type: 'queue'
    // Description: Operation to dequeue an element from a queue.
  },
  {
    id: 'Custom',
    type: 'queue'
    // Description: Custom queue operation.
  },

  // Hash Table operation
  {
    id: 'ClosedAddressingHT',
    type: 'HT'
    // Description: Operation to Close Addressing Hash table .
  },
  {
    id: 'OpenAddressingHT',
    type: 'HT'
    // Description: Operation to Open Addressing Hash table .
  },

  // bit operator manipulations

  {
    id: 'NumberToBinary',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: 'BinaryToNumber',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  },

  {
    id: 'BinaryAND',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: 'BinaryOR',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: 'BinaryNOT',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: 'BinaryXOR',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: 'BinaryLeftShit',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: 'BinaryRightShift',
    type: 'BitOperator'
    // Description: Operation to Open Addressing Hash table .
  }
];

/**
 * Asynchronously imports a specified module from a given path and returns the requested function.
 *
 * @param {string} requestedModuleFunction - The name of the function to be imported from the module.
 * @param {string} path - The path to the module.
 * @returns {Function|null} - The requested function if found, otherwise null.
 * @throws {Error} - If there is an error importing the module.
 */
async function moduleCollector(requestedModuleFunction, path) {
  console.log(`Attempting to import ${requestedModuleFunction} from ${path}`);
  try {
    const module = await import(/*@vite-ignore*/ path);

    if (requestedModuleFunction in module) {
      //  console.log("Module function found:", requestedModuleFunction);
      return module[requestedModuleFunction];
    } else {
      console.log('Requested module function not found.');
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Asynchronously initializes and imports a specific module based on the requested module type and function.
 * Dynamically selects the appropriate module based on the requested module type and imports the requested function from that module.
 *
 * @param {string} requestedModuleType - The type of the module to be initialized (e.g., "array", "array2D", "LL", "stack", "queue", "HT").
 * @param {string} requestedModuleFunction - The name of the function to be imported from the module.
 * @returns {Function|null} - The requested function if found, otherwise null.
 * @throws {Error} - If there is an error importing the module.
 */
async function initializeModule(requestedModuleType, requestedModuleFunction) {
  // Define module paths based on type

  const modulePaths = {
    array: './Programming/DSA/Array/__OneDimensional_Imports__.js',
    sorts: './Programming/DSA/Array/__OneDimensional_Imports__.js',
    array2D: './Programming/DSA/Array/__TwoDimensional_Imports__.js',
    SLL: './Programming/DSA/LinkedList/__Singly_Linked_List_Imports__.js',
    DLL: './Programming/DSA/LinkedList/__Doubly_Linked_List_Imports__.js',
    stack: './Programming/DSA/Stack/__StackOperation_Imports__.js',
    queue: './Programming/DSA/Queue/__QueueOperation_Imports__.js',
    HT: './Programming/DSA/HashTable/__HTOperation_Imports__.js',

    BitOperator: './Programming/BitOperators/__BitOperator__.js'
  };

  // Retrieve the module path based on the requested type

  const path = modulePaths[requestedModuleType];
  console.log(path);
  if (path) {
    return await moduleCollector(requestedModuleFunction, path);
  } else {
    console.log('Requested module type not supported.');
    return null;
  }
}

const Animation_Storage = FUNCTION_STORAGE.reduce((obj, animationObj) => {
  obj[animationObj.id] = animationObj;

  return obj;
}, {});

export default async function Animation(animation) {
  try {
    if (animation in Animation_Storage) {
      const [id, type] = [
        Animation_Storage[animation].id,
        Animation_Storage[animation].type
      ];

      const CURRENT_FUNCTION_ANIMATION_MODULE = await initializeModule(
        type,
        id
      );

      if (CURRENT_FUNCTION_ANIMATION_MODULE) {
        return [
          toggleCanvas,
          'Animation-',
          CURRENT_FUNCTION_ANIMATION_MODULE,
          id,
          type
        ];
      }
    }
  } catch (e) {
    console.log(e);
  }
}
