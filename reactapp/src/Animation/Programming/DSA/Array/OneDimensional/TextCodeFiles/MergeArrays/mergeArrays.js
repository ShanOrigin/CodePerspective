function mergeArrays(arr1, arr2) {
    let result = [];
    for (let num1 of arr1) {
        let found = result.includes(num1);
        if (!found) {
            result.push(num1);
        }
    }
    for (let num2 of arr2) {
        let found = result.includes(num2);
        if (!found) {
            result.push(num2);
        }
    }
    return result;
}

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = mergeArrays(arr1, arr2);

console.log("Merged array:", result);
