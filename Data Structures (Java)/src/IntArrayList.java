public class IntArrayList {
    private final int DEFAULT_ARR_LENGTH = 10;

    private Integer[] arr;
    private int top;
    private int arrLength;

    public IntArrayList() {
        arr = new Integer[DEFAULT_ARR_LENGTH];
        top = 0;
        arrLength = DEFAULT_ARR_LENGTH;
    }

    /**
     * Returns the index of the data to search
     * @param data
     * @return
     */
    public int search(Integer data) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == data) return i;
        }

        return -1;
    }

    public boolean empty() {
        return (top > 0) ? false : true;
    }

    /**
     * Adds data at a specific index
     * @param index
     * @param data
     */
    public void add(int index, Integer data) {
        checkLength();
        if (index - top < 0 && index < 0) throw new IllegalArgumentException("Invalid index");
        for (int i = top; i >= top - index; i--) {
            arr[i + 1] = arr[i];
        }
        arr[top - index] = data;
        top++;
    }

    /**
     * Adds data to the end of the list
     * @param data
     * @return
     */
    public boolean add(Integer data) {
        checkLength();
        for (int i = top; i >= 0; i--) {
            arr[i + 1] = arr[i];
        }
        
        arr[0] = data;
        top++;
        return true;
    }

    /**
     * Adds data to the front of the array
     * @param data
     */
    public void addFront(Integer data) {
        checkLength();
        arr[top] = data;
        top++;
    }

    /**
     * Gers data at a specific index
     * @param index
     * @return
     */
    public Integer get(int index) {
        if (index < 0 || index >= top) throw new IndexOutOfBoundsException("Invalid index");
        return arr[top - index - 1];
    }

    public int size() {
        return top;
    }

    /**
     * Removes data
     * @param data
     * @return
     */
    public Integer remove(Integer data) {
        boolean match = false;
        for (int i = 0; i < top; i++) {
            if (arr[i] == data) {
                match = true;
                top--;
            }
            if (match) {
                arr[i] = arr[i + 1];
            }
        }

        if (match) return data;
        return null;
    }

    /**
     * Removes the front element
     * @return
     */
    public Integer removeFront() {
        top--;
        return arr[top];
    }

    /**
     * Gets the front element
     * @return
     */
    public Integer getFront() {
        return arr[top - 1];
    }

    public boolean isEmpty() {
        return (top > 0) ? false : true;
    }


    public void visualize() {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    private void checkLength() {
        if (top + 1 >= arrLength) {
            arrLength *= 2;
            Integer[] newArr = new Integer[arrLength];
            for (int i = 0; i < arr.length; i++) {
                newArr[i] = arr[i];
            }
            arr = newArr;
        }
    }
    
}
