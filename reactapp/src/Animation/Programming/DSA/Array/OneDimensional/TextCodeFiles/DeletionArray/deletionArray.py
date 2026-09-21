def delete_element(arr, size, pos):
    if pos < 1 or pos > size:
        print("Invalid position")
        return

    for i in range(pos - 1, size - 1):
        arr[i] = arr[i + 1]
    size -= 1

arr = [1, 2, 4, 5, 8, 9]
size = 6  # Current size of the array
pos = 3  # Position to delete the element

delete_element(arr, size, pos)

print("Updated array:", arr[:size])
