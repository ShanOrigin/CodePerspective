import java.util.Arrays;

public class Main {
    // Function to perform binary search
    static int binarySearch(int[] arr, int key) {
        int low = 0;
        int high = arr.length - 1;
        
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

    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 5, 8, 9};
        int key = 8;

        int result = binarySearch(arr, key);

        if (result != -1) {
            System.out.println("Element found at index " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}
