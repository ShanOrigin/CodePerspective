#include <iostream>
#include <vector>

using namespace std;

void insertElement(vector<int>& arr, int pos, int element) {
    if (pos < 1 || pos > arr.size() + 1) {
        cout << "Invalid position" << endl;
        return;
    }

    arr.push_back(0); // Add a dummy element at the end
    for (int i = arr.size() - 1; i > pos - 1; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos - 1] = element;
}

int main() {
    vector<int> arr = {1, 2, 4, 5, 8, 9};
    int pos = 3; // Position to insert the element
    int element = 6; // Element to be inserted

    insertElement(arr, pos, element);

    cout << "Updated array: ";
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
