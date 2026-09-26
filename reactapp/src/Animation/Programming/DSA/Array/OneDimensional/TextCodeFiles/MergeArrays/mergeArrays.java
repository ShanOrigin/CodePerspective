import java.util.Arrays;

public class Main {
    static void mergeArrays(int[] arr1, int[] arr2, int[] result) {
        int k = 0;
        for (int num1 : arr1) {
            boolean found = false;
            for (int num : result) {
                if (num1 == num) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                result[k++] = num1;
            }
        }
        for (int num2 : arr2) {
            boolean found = false;
            for (int num : result) {
                if (num2 == num) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                result[k++] = num2;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {4, 5, 6};
        int[] result = new int[arr1.length + arr2.length];

        mergeArrays(arr1, arr2, result);

        System.out.print("Merged array: ");
        for (int num : result) {
            if (num != 0) {
                System.out.print(num + " ");
            }
        }
        System.out.println();
    }
}
