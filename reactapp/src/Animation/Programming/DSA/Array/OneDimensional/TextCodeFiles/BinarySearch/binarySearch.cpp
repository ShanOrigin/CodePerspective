#include <iostream>
#include <vector>

using namespace std;

// Function to perform binary search
int binarySearch(vector<int>& arr, int low, int high, int key) {
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
    vector<int> arr = {1, 2, 4, 5, 8, 9};
    int key = 8;

    int result = binarySearch(arr, 0, arr.size() - 1, key);

    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }

    return 0;
}
