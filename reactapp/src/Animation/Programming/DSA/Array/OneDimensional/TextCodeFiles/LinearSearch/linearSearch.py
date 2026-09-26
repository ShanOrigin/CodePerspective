def linear_search(arr, key):
    for i in range(len(arr)):
        if arr[i] == key:
            return i  # Return index if key is found
    return -1  # Return -1 if key is not found

arr = [1, 4, 8, 2, 9, 5]
key = 8

result = linear_search(arr, key)

if result != -1:
    print("Element found at index", result)
else:
    print("Element not found")
