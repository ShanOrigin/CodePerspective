import java.util.Arrays;

public class Main {
    static void concatenateArrays(int[] arr1, int[] arr2, int[] result) {
        System.arraycopy(arr1, 0, result, 0, arr1.length);
        System.arraycopy(arr2, 0, result, arr1.length, arr2.length);
    }

    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {4, 5, 6};
        int[] result = new int[arr1.length + arr2.length];

        concatenateArrays(arr1, arr2, result);

        System.out.print("Concatenated array: ");
        for (int num : result) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
