#include <iostream>
#include <vector>

using namespace std;

void deleteElement(vector<int>& arr, int pos) {
    if (pos < 1 || pos > arr.size()) {
        cout << "Invalid position" << endl;
        return;
    }

    arr.erase(arr.begin() + pos - 1);
}

int main() {
    vector<int> arr = {1, 2, 4, 5, 8, 9};
    int pos = 3; // Position to delete the element

    deleteElement(arr, pos);

    cout << "Updated array: ";
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
