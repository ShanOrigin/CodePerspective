def reverse_array(arr):
    size = len(arr)
    for i in range(size // 2):
        arr[i], arr[size - i - 1] = arr[size - i - 1], arr[i]

arr = [1, 2, 3, 4, 5]

reverse_array(arr)

print("Reversed array:", arr)
