function deleteElement(arr, pos) {
    if (pos < 1 || pos > arr.length) {
        console.log("Invalid position");
        return;
    }

    for (let i = pos - 1; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr.pop();
}

let arr = [1, 2, 4, 5, 8, 9];
let pos = 3; // Position to delete the element

deleteElement(arr, pos);

console.log("Updated array:", arr);
