public class Main {
    static void insertElement(int[] arr, int size, int pos, int element) {
        if (pos < 1 || pos > size + 1) {
            System.out.println("Invalid position");
            return;
        }

        for (int i = size; i >= pos; i--) {
            arr[i] = arr[i - 1];
        }
        arr[pos - 1] = element;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 5, 8, 9};
        int size = 6; // Current size of the array
        int pos = 3; // Position to insert the element
        int element = 6; // Element to be inserted

        insertElement(arr, size, pos, element);

        System.out.print("Updated array: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
