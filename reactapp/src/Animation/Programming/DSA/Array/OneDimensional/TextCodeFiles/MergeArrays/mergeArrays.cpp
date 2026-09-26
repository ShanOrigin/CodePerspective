#include <iostream>

void mergeArrays(int arr1[], int size1, int arr2[], int size2, int result[]) {
    int size = size1 + size2;
    int k = 0;
    for (int i = 0; i < size1; i++) {
        bool found = false;
        for (int j = 0; j < k; j++) {
            if (arr1[i] == result[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            result[k++] = arr1[i];
        }
    }
    for (int i = 0; i < size2; i++) {
        bool found = false;
        for (int j = 0; j < k; j++) {
            if (arr2[i] == result[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            result[k++] = arr2[i];
        }
    }
}

int main() {
    int arr1[] = {1, 2, 3};
    int size1 = sizeof(arr1) / sizeof(arr1[0]);
    int arr2[] = {4, 5, 6};
    int size2 = sizeof(arr2) / sizeof(arr2[0]);
    int result[size1 + size2];

    mergeArrays(arr1, size1, arr2, size2, result);

    std::cout << "Merged array: ";
    for (int i = 0; i < size1 + size2; i++) {
        std::cout << result[i] << " ";
    }
    std::cout << std::endl;

    return 0;
}
