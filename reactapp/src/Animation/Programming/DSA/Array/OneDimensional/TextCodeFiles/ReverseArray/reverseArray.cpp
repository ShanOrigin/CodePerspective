#include <iostream>
#include <vector>

using namespace std;

void reverseArray(vector<int>& arr) {
    int size = arr.size();
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - i - 1];
        arr[size - i - 1] = temp;
    }
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};

    reverseArray(arr);

    cout << "Reversed array: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
