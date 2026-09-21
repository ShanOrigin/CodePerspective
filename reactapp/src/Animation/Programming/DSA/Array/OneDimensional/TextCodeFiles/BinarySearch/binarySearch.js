function binarySearch(arr, key) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        
        if (arr[mid] === key) {
            return mid;  // Return index if key is found
        }
        else if (arr[mid] < key) {
            low = mid + 1;  // If key is greater, search in the right half
        }
        else {
            high = mid - 1;  // If key is smaller, search in the left half
        }
    }
    
    return -1;  // Return -1 if key is not found
}

const arr = [1, 2, 4, 5, 8, 9];
const key = 8;

const result = binarySearch(arr, key);

if (result !== -1) {
    console.log("Element found at index", result);
} else {
    console.log("Element not found");
}
