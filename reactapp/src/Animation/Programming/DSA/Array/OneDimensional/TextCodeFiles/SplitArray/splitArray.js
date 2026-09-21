function splitArray(arr, index) {
    let first = arr.slice(0, index);
    let second = arr.slice(index);
    return [first, second];
}

let arr = [1, 2, 3, 4, 5];
let index = 2;

let [first, second] = splitArray(arr, index);

console.log("First array:", first);
console.log("Second array:", second);
