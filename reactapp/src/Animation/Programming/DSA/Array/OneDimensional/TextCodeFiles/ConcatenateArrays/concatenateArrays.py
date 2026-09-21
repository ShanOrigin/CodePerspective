def concatenate_arrays(arr1, arr2):
    result = arr1[:]
    result.extend(arr2)
    return result

arr1 = [1, 2, 3]
arr2 = [4, 5, 6]

result = concatenate_arrays(arr1, arr2)

print("Concatenated array:", result)
