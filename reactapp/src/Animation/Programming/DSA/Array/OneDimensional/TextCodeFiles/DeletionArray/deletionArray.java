public class Main {
    static void deleteElement(int[] arr, int size, int pos) {
        if (pos < 1 || pos > size) {
            System.out.println("Invalid position");
            return;
        }

        for (int i = pos - 1; i < size - 1; i++) {
            arr[i] = arr[i + 1];
        }
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 5, 8, 9};
        int size = 6; // Current size of the array
        int pos = 3; // Position to delete the element

        deleteElement(arr, size, pos);

        System.out.print("Updated array: ");
        for (int i = 0; i < size - 1; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}
