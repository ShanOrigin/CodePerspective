#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    
    cout << "Enter the size of the array: ";
    cin >> n;
    
    vector<int> arr(n);
    
    cout << "Enter " << n << " elements:" << endl;
    for (int i = 0; i < n; i++) {
        cout << "Element " << i + 1 << ": ";
        cin >> arr[i];
    }
    
    cout << "The array you entered is:" << endl;
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}
