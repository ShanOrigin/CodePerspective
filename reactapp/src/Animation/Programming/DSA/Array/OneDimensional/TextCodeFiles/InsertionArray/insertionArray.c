#include <stdio.h>

void insertElement(int arr[], int size, int pos, int element) {
    if (pos < 1 || pos > size + 1) {
        printf("Invalid position\n");
        return;
    }

    for (int i = size; i >= pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos - 1] = element;
}

int main() {
    int arr[10] = {1, 2, 4, 5, 8, 9};
    int size = 6; // Current size of the array
    int pos = 3; // Position to insert the element
    int element = 6; // Element to be inserted

    insertElement(arr, size, pos, element);

    printf("Updated array: ");
    for (int i = 0; i < size + 1; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}
