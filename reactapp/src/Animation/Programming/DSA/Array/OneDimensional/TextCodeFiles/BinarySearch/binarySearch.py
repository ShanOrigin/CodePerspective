def binary_search(arr, key):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == key:
            return mid  # Return index if key is found
        elif arr[mid] < key:
            low = mid + 1  # If key is greater, search in the right half
        else:
            high = mid - 1  # If key is smaller, search in the left half
    
    return -1  # Return -1 if key is not found

arr = [1, 2, 4, 5, 8, 9]
key = 8

result = binary_search(arr, key)

if result != -1:
    print("Element found at index", result)
else:
    print("Element not found")
