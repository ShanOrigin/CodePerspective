def insert_element(arr, size, pos, element):
    if pos < 1 or pos > size + 1:
        print("Invalid position")
        return

    arr.append(0)  # Add a dummy element at the end
    for i in range(size, pos - 1, -1):
        arr[i] = arr[i - 1]
    arr[pos - 1] = element

arr = [1, 2, 4, 5, 8, 9]
size = 6  # Current size of the array
pos = 3  # Position to insert the element
element = 6  # Element to be inserted

insert_element(arr, size, pos, element)

print("Updated array:", arr)
