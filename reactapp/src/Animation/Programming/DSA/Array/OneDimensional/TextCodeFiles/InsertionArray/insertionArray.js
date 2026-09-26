function insertElement(arr, size, pos, element) {
    if (pos < 1 || pos > size + 1) {
        console.log("Invalid position");
        return;
    }

    arr[size] = 0; // Add a dummy element at the end
    for (let i = size; i >= pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos - 1] = element;
}

let arr = [1, 2, 4, 5, 8, 9];
let size = 6; // Current size of the array
let pos = 3; // Position to insert the element
let element = 6; // Element to be inserted

insertElement(arr, size, pos, element);

console.log("Updated array:", arr);
