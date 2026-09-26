function concatenateArrays(arr1, arr2) {
    let result = [];
    for (let num of arr1) {
        result.push(num);
    }
    for (let num of arr2) {
        result.push(num);
    }
    return result;
}

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = concatenateArrays(arr1, arr2);

console.log("Concatenated array:", result);
