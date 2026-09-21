def merge_arrays(arr1, arr2):
    result = []
    for num1 in arr1:
        if num1 not in result:
            result.append(num1)
    for num2 in arr2:
        if num2 not in result:
            result.append(num2)
    return result

arr1 = [1, 2, 3]
arr2 = [4, 5, 6]

result = merge_arrays(arr1, arr2)

print("Merged array:", result)
