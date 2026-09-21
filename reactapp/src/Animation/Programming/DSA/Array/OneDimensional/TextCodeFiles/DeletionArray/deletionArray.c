#include <stdio.h>

void deleteElement(int arr[], int *size, int pos) {
    if (pos < 1 || pos > *size) {
        printf("Invalid position\n");
        return;
    }

    for (int i = pos - 1; i < *size - 1; i++) {
        arr[i] = arr[i + 1];
    }
    (*size)--;
}

int main() {
    int arr[10] = {1, 2, 4, 5, 8, 9};
    int size = 6; // Current size of the array
    int pos = 3; // Position to delete the element

    deleteElement(arr, &size, pos);

    printf("Updated array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}
