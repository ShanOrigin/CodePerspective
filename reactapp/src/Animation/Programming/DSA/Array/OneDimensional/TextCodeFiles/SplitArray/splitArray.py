def split_array(arr, index):
    first = arr[:index]
    second = arr[index:]
    return first, second

arr = [1, 2, 3, 4, 5]
index = 2

first, second = split_array(arr, index)

print("First array:", first)
print("Second array:", second)
