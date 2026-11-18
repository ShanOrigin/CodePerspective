import { CanvasHandler } from "./Source/Components/Canvas.js";
import {
  waitForLength,
  clearCanvas,
  createButton,
  canvasFunction,
} from "./Source/Utilities/utilities.js";

// Statically discoverable module loader registry for animation categories.
// Allows Vite to statically discover and bundle only the required aggregator chunks
// while maintaining lazy loading for each category.
const moduleLoaders = {
  array: () => import("./Programming/DSA/Array/__OneDimensional_Imports__.js"),
  sorts: () => import("./Programming/DSA/Array/__OneDimensional_Imports__.js"),
  array2D: () =>
    import("./Programming/DSA/Array/__TwoDimensional_Imports__.js"),
  SLL: () =>
    import("./Programming/DSA/LinkedList/__Singly_Linked_List_Imports__.js"),
  DLL: () =>
    import("./Programming/DSA/LinkedList/__Doubly_Linked_List_Imports__.js"),
  stack: () => import("./Programming/DSA/Stack/__StackOperation_Imports__.js"),
  queue: () => import("./Programming/DSA/Queue/__QueueOperation_Imports__.js"),
  HT: () => import("./Programming/DSA/HashTable/__HTOperation_Imports__.js"),
  BitOperator: () => import("./Programming/BitOperators/__BitOperator__.js"),
};

const modulePaths = {
  array: "./Programming/DSA/Array/__OneDimensional_Imports__.js",
  sorts: "./Programming/DSA/Array/__OneDimensional_Imports__.js",
  array2D: "./Programming/DSA/Array/__TwoDimensional_Imports__.js",
  SLL: "./Programming/DSA/LinkedList/__Singly_Linked_List_Imports__.js",
  DLL: "./Programming/DSA/LinkedList/__Doubly_Linked_List_Imports__.js",
  stack: "./Programming/DSA/Stack/__StackOperation_Imports__.js",
  queue: "./Programming/DSA/Queue/__QueueOperation_Imports__.js",
  HT: "./Programming/DSA/HashTable/__HTOperation_Imports__.js",
  BitOperator: "./Programming/BitOperators/__BitOperator__.js",
};

// Module cache to avoid redundant network requests once a category is loaded
const moduleCache = new Map();

async function loadCategoryModule(type, path) {
  const cacheKey = type || path;
  if (moduleCache.has(cacheKey)) {
    return moduleCache.get(cacheKey);
  }

  const loader = (type && moduleLoaders[type]) || (path && moduleLoaders[path]);
  if (!loader) {
    throw new Error(
      `No module loader found for type "${type}" or path "${path}"`,
    );
  }

  const modulePromise = loader().catch((error) => {
    // Evict on error so subsequent attempts can retry
    moduleCache.delete(cacheKey);
    throw error;
  });

  moduleCache.set(cacheKey, modulePromise);
  return modulePromise;
}

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
  REQUESTED_MODULE_FUNCTION,
) {
  try {
    switch (REQUESTED_MODULE_TYPE) {
      case "array":
      case "sorts":
        if (
          ANIMATION_FUNCTION.ONE_D_ARRAY &&
          REQUESTED_MODULE_FUNCTION in ANIMATION_FUNCTION.ONE_D_ARRAY
        ) {
          return ANIMATION_FUNCTION.ONE_D_ARRAY[REQUESTED_MODULE_FUNCTION];
        }
        break;

      case "array2D":
        if (
          ANIMATION_FUNCTION.TWO_D_ARRAY &&
          REQUESTED_MODULE_FUNCTION in ANIMATION_FUNCTION.TWO_D_ARRAY
        ) {
          return ANIMATION_FUNCTION.TWO_D_ARRAY[REQUESTED_MODULE_FUNCTION];
        }
        break;

      case "LL":
        if (
          ANIMATION_FUNCTION.LINKED_LIST &&
          REQUESTED_MODULE_FUNCTION in ANIMATION_FUNCTION.LINKED_LIST
        ) {
          return ANIMATION_FUNCTION.LINKED_LIST[REQUESTED_MODULE_FUNCTION];
        }
        break;

      case "stack":
      case "queue":
      case "HT":
        return null;

      default:
        console.warn("Requested module type not supported.");
        break;
    }
    return null; // Default return value if no match found
  } catch (e) {
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

const canvasHandlerPromise = (() => {
  let resolveHandler, rejectHandler;
  const promise = new Promise((resolve, reject) => {
    resolveHandler = resolve;
    rejectHandler = reject;
  });
  return {
    promise,
    resolve: (value) => resolveHandler(value),
    reject: (err) => rejectHandler(err),
  };
})();

async function toggleCanvas(
  canvasID,
  runningFunction,
  functorName,
  structureType,
) {
  try {
    canvasID = canvasID + "Canvas";

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

        canvasHandlerPromise.resolve(canvasHandler);
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
          arrayLength,
        );
        await canvasHandler.delay();

        setupCanvasButtons();
        canvasFunction(canvasHandler, false);

        if (canvasHandler.canvasExists && !isRunning) {
          await canvasHandler.delay({ time: 300 });
          if (typeof canvasFunction === "function") {
            await runningFunction({ canvas: canvasHandler });
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
        paper: canvasHandler.paper,
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
  arrayLength,
) {
  canvasHandler.createCanvas({
    canvasID: canvasID,
    structureType: structureType,
    functorName: functorName,
    ArrayLength: arrayLength,
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
    id: "reset",
    textContent: "Reset",
    padding: 10,
  });

  canvasHandler.playButton = createButton({
    canvas: canvasHandler,
    x: canvasHandler.canvasWidth - canvasHandler.rectWidth * 1.25,
    y: canvasHandler.resetButton.rect.attr("height") * 1.22,
    colorCode: 2,
    id: "play",
    textContent: "Play",
    maxWidth: canvasHandler.resetButton.maxWidth,
    padding: 10,
  });
  canvasHandler.playButton.addClickAction(() => {
    canvasHandler.isPaused = false;
    canvasHandler.pauseButton.enableButton();
    canvasHandler.playButton.enableButton();
  });

  canvasHandler.pauseButton = createButton({
    canvas: canvasHandler,
    x: canvasHandler.canvasWidth - canvasHandler.rectWidth * 1.25,
    y: canvasHandler.resetButton.rect.attr("height") * 2.26,
    colorCode: 1,
    id: "pause",
    textContent: "Pause",
    maxWidth: canvasHandler.resetButton.maxWidth,
    padding: 10,
  });
  canvasHandler.pauseButton.addClickAction(() => {
    canvasHandler.isPaused = true;
    canvasHandler.resetButton.disableButton();
  });
}

const FUNCTION_STORAGE = [
  // Array operations
  {
    id: "CreationArray",
    type: "array",
    // Description: Operation to create a new array.
  },
  {
    id: "LinearSearch",
    type: "array",
    // Description: Operation to perform linear search on an array.
  },
  {
    id: "BinarySearch",
    type: "array",
    // Description: Operation to perform binary search on a sorted array.
  },
  {
    id: "InsertionArray",
    type: "array",
    // Description: Operation to insert an element into an array.
  },
  {
    id: "DeletionArray",
    type: "array",
    // Description: Operation to delete an element from an array.
  },
  {
    id: "MergeArrays",
    type: "array",
    // Description: Operation to merge two arrays.
  },
  {
    id: "ConcatenateArrays",
    type: "array",
    // Description: Operation to concatenate two arrays.
  },
  {
    id: "SplitArray",
    type: "array",
    // Description: Operation to split an array.
  },
  {
    id: "ReverseArray",
    type: "array",
    // Description: Operation to reverse the elements of an array.
  },

  // Sorting algorithms
  {
    id: "BubbleSort",
    type: "sorts",
    // Description: Operation to perform bubble sort algorithm.
  },

  {
    id: "InsertionSort",
    type: "sorts",
    // Description: Operation to perform insertion sort algorithm.
  },
  {
    id: "SelectionSort",
    type: "sorts",
    // Description: Operation to perform selection sort algorithm.
  },

  {
    id: "QuickSort",
    type: "sorts",
    // Description: Operation to perform quick sort algorithm.
  },

  {
    id: "ShellSort",
    type: "sorts",
    // Description: Operation to perform shell sort algorithm.
  },
  {
    id: "CountSort",
    type: "sorts",
    // Description: Operation to perform count sort algorithm.
  },

  {
    id: "RadixSort",
    type: "sorts",
    // Description: Operation to perform radix sort algorithm.
  },

  // 2D Array operations
  {
    id: "TransposeOf2DArray",
    type: "array2D",
    // Description: Operation to Transpose  a 2D array.
  },
  {
    id: "CreateArray2D",
    type: "array2D",
    // Description: Operation to create a 2D array.
  },
  {
    id: "SearchIn2D",
    type: "array2D",
    // Description: Operation to search an element in a 2D array.
  },
  {
    id: "AdditionOf2D",
    type: "array2D",
    // Description: Operation to perform addition of two 2D arrays.
  },
  {
    id: "SubtractionOf2D",
    type: "array2D",
    // Description: Operation to perform subtraction of two 2D arrays.
  },
  {
    id: "MultiplicationOf2D",
    type: "array2D",
    // Description: Operation to perform multiplication of two 2D arrays.
  },

  // Singly Linked List operations
  {
    id: "CreateSLL",
    type: "SLL",
    // Description: Operation to create a singly linked list.
  },
  {
    id: "TraverseInSLL",
    type: "SLL",
    // Description: Operation to traverse a singly linked list.
  },
  {
    id: "InsetAtHead",
    type: "SLL",
    // Description: Operation to insert a node at the head of a singly linked list.
  },
  {
    id: "InsertInBetween",
    type: "SLL",
    // Description: Operation to insert a node in between nodes of a singly linked list.
  },
  {
    id: "InsertAtTail",
    type: "SLL",
    // Description: Operation to insert a node at the tail of a singly linked list.
  },
  {
    id: "DeteleAtHead",
    type: "SLL",
    // Description: Operation to delete a node at the head of a singly linked list.
  },
  {
    id: "DeleteInBetween",
    type: "SLL",
    // Description: Operation to delete a node in between nodes of a singly linked list.
  },
  {
    id: "DeleteAtTail",
    type: "SLL",
    // Description: Operation to delete a node at the tail of a singly linked list.
  },
  {
    id: "ReverseSLL",
    type: "SLL",
    // Description: Operation to reverse a singly linked list.
  },

  // Doubly Linked List operations
  {
    id: "CreateDLL",
    type: "DLL",
    // Description: Operation to create a doubly linked list.
  },
  {
    id: "TraverseInDLL",
    type: "DLL",
    // Description: Operation to traverse a doubly linked list.
  },
  {
    id: "DInsertAtHead",
    type: "DLL",
    // Description: Operation to insert a node at the head of a doubly linked list.
  },
  {
    id: "DInsertInBetween",
    type: "DLL",
    // Description: Operation to insert a node in between nodes of a doubly linked list.
  },
  {
    id: "DInsertAtTail",
    type: "DLL",
    // Description: Operation to insert a node at the tail of a doubly linked list.
  },
  {
    id: "DDeteleAtHead",
    type: "DLL",
    // Description: Operation to delete a node at the head of a doubly linked list.
  },
  {
    id: "DDeleteInBetween",
    type: "DLL",
    // Description: Operation to delete a node in between nodes of a doubly linked list.
  },
  {
    id: "DDeleteAtTail",
    type: "DLL",
    // Description: Operation to delete a node at the tail of a doubly linked list.
  },

  // Stack operations
  {
    id: "StackPush",
    type: "stack",
    // Description: Operation to push an element onto a stack.
  },
  {
    id: "StackPop",
    type: "stack",
    // Description: Operation to pop an element from a stack.
  },
  {
    id: "CustomStack",
    type: "stack",
    // Description: Custom stack operation.
  },

  // Queue operations
  {
    id: "EnQueue",
    type: "queue",
    // Description: Operation to enqueue an element into a queue.
  },
  {
    id: "DeQueue",
    type: "queue",
    // Description: Operation to dequeue an element from a queue.
  },
  {
    id: "Custom",
    type: "queue",
    // Description: Custom queue operation.
  },

  // Hash Table operation
  {
    id: "ClosedAddressingHT",
    type: "HT",
    // Description: Operation to Close Addressing Hash table .
  },
  {
    id: "OpenAddressingHT",
    type: "HT",
    // Description: Operation to Open Addressing Hash table .
  },

  // bit operator manipulations

  {
    id: "NumberToBinary",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: "BinaryToNumber",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },

  {
    id: "BinaryAND",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: "BinaryOR",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: "BinaryNOT",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: "BinaryXOR",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: "BinaryLeftShit",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },
  {
    id: "BinaryRightShift",
    type: "BitOperator",
    // Description: Operation to Open Addressing Hash table .
  },
];

/**
 * Loads a module and returns the requested exported function.
 *
 * @param {string} requestedModuleFunction - Export name to retrieve.
 * @param {string} path - Module path relative to this file.
 * @param {string} [requestedModuleType] - Optional module category type.
 * @returns {Promise<Function>} Requested function.
 * @throws {Error} If module fails to load or export is missing.
 */
async function moduleCollector(
  requestedModuleFunction,
  path,
  requestedModuleType,
) {
  try {
    const module = await loadCategoryModule(requestedModuleType, path);

    if (typeof module[requestedModuleFunction] === "function") {
      return module[requestedModuleFunction];
    }

    const exportError = new Error(
      `Export "${requestedModuleFunction}" not found in module: ${path}`,
    );
    console.error(exportError.message);
    throw exportError;
  } catch (error) {
    console.error(`Failed to load animation module: ${path}`, error);
    throw error;
  }
}

/**
 * Asynchronously initializes and imports a specific module based on the requested module type and function.
 * Dynamically selects the appropriate module based on the requested module type and imports the requested function from that module.
 *
 * @param {string} requestedModuleType - The type of the module to be initialized (e.g., "array", "array2D", "LL", "stack", "queue", "HT").
 * @param {string} requestedModuleFunction - The name of the function to be imported from the module.
 * @returns {Promise<Function|null>} - The requested function if found, otherwise null.
 * @throws {Error} - If there is an error importing the module.
 */
async function initializeModule(requestedModuleType, requestedModuleFunction) {
  const path = modulePaths[requestedModuleType];
  if (path) {
    return await moduleCollector(
      requestedModuleFunction,
      path,
      requestedModuleType,
    );
  } else {
    console.error(
      `Requested module type "${requestedModuleType}" not supported.`,
    );
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
        Animation_Storage[animation].type,
      ];

      const CURRENT_FUNCTION_ANIMATION_MODULE = await initializeModule(
        type,
        id,
      );

      if (CURRENT_FUNCTION_ANIMATION_MODULE) {
        return [
          toggleCanvas,
          "Animation-",
          CURRENT_FUNCTION_ANIMATION_MODULE,
          id,
          type,
          canvasHandlerPromise,
        ];
      }
    }
    return null;
  } catch (e) {
    console.error(`Error loading animation "${animation}":`, e);
    throw e;
  }
}
