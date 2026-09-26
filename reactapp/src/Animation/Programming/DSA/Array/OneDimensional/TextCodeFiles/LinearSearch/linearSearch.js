function linearSearch(arr, key) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === key) {
            return i;  // Return index if key is found
        }
    }
    return -1;  // Return -1 if key is not found
}

const arr = [1, 4, 8, 2, 9, 5];
const key = 8;

const result = linearSearch(arr, key);

if (result !== -1) {
    console.log("Element found at index", result);
} else {
    console.log("Element not found");
}
