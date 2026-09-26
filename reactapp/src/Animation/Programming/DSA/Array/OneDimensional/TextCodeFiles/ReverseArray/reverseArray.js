function reverseArray(arr) {
    let size = arr.length;
    for (let i = 0; i < Math.floor(size / 2); i++) {
        let temp = arr[i];
        arr[i] = arr[size - i - 1];
        arr[size - i - 1] = temp;
    }
}

let arr = [1, 2, 3, 4, 5];

reverseArray(arr);

console.log("Reversed array:", arr);
