n = int(input("Enter the size of the array: "))
arr = []

print("Enter", n, "elements:")
for i in range(n):
    arr.append(int(input(f"Element {i+1}: ")))

print("The array you entered is:")
for element in arr:
    print(element, end=" ")
