#include <iostream>
#include <vector>

using namespace std;

// Function to perform linear search
int linearSearch(vector<int>& arr, int key) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == key) {
            return i;  // Return index if key is found
        }
    }
    return -1;  // Return -1 if key is not found
}

int main() {
    vector<int> arr = {1, 4, 8, 2, 9, 5};
    int key = 8;

    int result = linearSearch(arr, key);

    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }

    return 0;
}
