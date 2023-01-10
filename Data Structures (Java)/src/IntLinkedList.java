public class IntLinkedList {
    private IntNode head;
    private int length;

    public IntLinkedList() {
        this.head = null;
        this.length = 0;
    }

    /**
     * Adds the number to the front of the list
     * (redefines the head)
     * @param number
     */
    public boolean addFront(Integer data) {
        if (head == null) head = new IntNode(data);
        else head = new IntNode(data, head);

        length++;
        return true;
    }

    /**
     * Adds a number to the end of the list
     * @param number
     */
    public boolean add(Integer data) {
        if (head == null) {
            head = new IntNode(data);
        } else {           
            IntNode item = head;
            while (item.getLink() != null) {
                item = item.getLink();
            }
            
            item.setLink(new IntNode(data));
        }

        length++;
        return true;
    }

    /**
     * Adds data at a specific index
     * @param index
     * @return
     */
    public boolean add(int index, Integer data) {
        if (index > length) throw new IndexOutOfBoundsException("Cannot insert element at index " + index + ", max index is " + length);
        if (index == 0) {
            addFront(data);
            return true;
        }

        IntNode item = head;
        for (int i = 1; i < index; i++) {
            item = item.getLink();
        }

        item.setLink(new IntNode(data, item.getLink()));
        length++;
        return true;
    }

    /**
     * Gets the data at a specific index
     * @param index
     * @return
     */
    public Integer get(int index) {
        if (index >= length) throw new IndexOutOfBoundsException("Cannot get element at index " + index + ", max index is " + length);

        IntNode item = head;
        for (int i = 0; i < index; i++) {
            item = item.getLink();
        }

        return item.getData();
    }

    public int size() {
        return length;
    }

    /**
     * Visualizes the linked list in the console
     */
    public void visualize() {
        if (length == 0) {
            System.out.print("[ ]");
            System.out.println();
            return;
        }

        System.out.print("[ ");

        IntNode item = head;
        for (int i = 0; i < length; i++) {
            try {
                System.out.print(item.getData());
            } catch (Exception e) {
                System.out.println();
                throw new IllegalStateException("A code error occurred; The length is not valid.");
            }
            item = item.getLink();
            if (item != null) System.out.print(", ");
        }

        System.out.print(" ]");
        System.out.println();
    }

    public boolean isEmpty() {
        return (head == null) ? true : false;
    }

    public Integer remove(Integer data) {
        if (head != null && head.getData() == data){ 
            head = head.getLink();
            length--;
            return data;
        }

        IntNode item = head;
        while (item.getLink() != null) {
            if (item.getLink().getData() == data) {
                item.setLink(item.getLink().getLink());
                length--;
                return data;
            }
            item = item.getLink();
        }

        return null;
    }
}