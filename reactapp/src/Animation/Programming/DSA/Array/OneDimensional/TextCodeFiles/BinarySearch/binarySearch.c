#include <stdio.h>

// Function to perform binary search
int binarySearch(int arr[], int low, int high, int key) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == key) {
            return mid;  // Return index if key is found
        }
        else if (arr[mid] < key) {
            low = mid + 1;  // If key is greater, search in the right half
        }
        else {
            high = mid - 1;  // If key is smaller, search in the left half
        }
    }
    
    return -1;  // Return -1 if key is not found
}

int main() {
    int arr[] = {1, 2, 4, 5, 8, 9};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 8;

    int result = binarySearch(arr, 0, n - 1, key);

    if (result != -1) {
        printf("Element found at index %d\n", result);
    } else {
        printf("Element not found\n");
    }

    return 0;
}
