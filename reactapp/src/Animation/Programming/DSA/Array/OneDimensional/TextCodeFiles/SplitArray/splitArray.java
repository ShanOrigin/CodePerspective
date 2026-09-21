import java.util.Arrays;

public class Main {
    static void splitArray(int[] arr, int index, int[] first, int[] second) {
        for (int i = 0; i < index; i++) {
            first[i] = arr[i];
        }
        for (int i = index; i < arr.length; i++) {
            second[i - index] = arr[i];
        }
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int index = 2;
        int[] first = new int[index];
        int[] second = new int[arr.length - index];

        splitArray(arr, index, first, second);

        System.out.print("First array: ");
        for (int num : first) {
            System.out.print(num + " ");
        }
        System.out.print("\nSecond array: ");
        for (int num : second) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
