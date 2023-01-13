public class IntArrayStack {
    private final int DEFAULT_ARR_LENGTH = 10;

    private Integer[] arr;
    private int top;
    private int arrLength;

    public IntArrayStack() {
        arr = new Integer[DEFAULT_ARR_LENGTH];
        top = 0;
        arrLength = DEFAULT_ARR_LENGTH;
    }

    public void push(Integer data) {
        if (top >= arrLength) {
            arrLength *= 2;
            Integer[] newArr = new Integer[arrLength];
            for (int i = 0; i < arr.length; i++) {
                newArr[i] = arr[i];
            }
            arr = newArr;
        }

        top++;
        arr[top] = data;
    }

    public Integer peek() {
        return arr[top];
    }

    public Integer pop() {
        top--;
        return arr[top + 1];
    }

    public int search(Integer data) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == data) return i;
        }

        return -1;
    }

    public boolean empty() {
        return (top > 0) ? false : true;
    }
}
