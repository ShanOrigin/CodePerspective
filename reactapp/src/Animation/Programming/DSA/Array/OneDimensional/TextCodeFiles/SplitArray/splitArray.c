#include <stdio.h>

void splitArray(int arr[], int size, int index, int first[], int* firstSize, int second[], int* secondSize) {
    *firstSize = index;
    *secondSize = size - index;
    for (int i = 0; i < index; i++) {
        first[i] = arr[i];
    }
    for (int i = index; i < size; i++) {
        second[i - index] = arr[i];
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    int index = 2;
    int first[index];
    int firstSize;
    int second[size - index];
    int secondSize;

    splitArray(arr, size, index, first, &firstSize, second, &secondSize);

    printf("First array: ");
    for (int i = 0; i < firstSize; i++) {
        printf("%d ", first[i]);
    }
    printf("\nSecond array: ");
    for (int i = 0; i < secondSize; i++) {
        printf("%d ", second[i]);
    }
    printf("\n");

    return 0;
}
