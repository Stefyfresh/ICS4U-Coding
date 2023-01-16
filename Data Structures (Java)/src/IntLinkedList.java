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
     * Gets the front element
     * @return
     */
    public Integer getFront() {
        return head.getData();
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
        if (index >= length && index > 0) throw new IndexOutOfBoundsException("Cannot get element at index " + index + ", max index is " + length);
        if (index < 0) throw new IllegalArgumentException("Index cannot be negative");
        if (head == null) throw new IllegalStateException("Cannot get items from an empty list");
        
        IntNode item = head;
        for (int i = 0; i < index; i++) {
            item = item.getLink();
        }

        return item.getData();
    }

    public boolean isEmpty() {
        return (head == null) ? true : false;
    }

    /**
     * Removes data from the list
     * @param data
     * @return
     */
    public Integer remove(Integer data) {
        if (head == null) return null;
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

    /**
     * Removes the front element
     * @return
     */
    public Integer removeFront() {
        if (head == null) return null;

        Integer data = head.getData();
        head = head.getLink();

        length--;
        return data;
    }


    public int size() {
        return length;
    }

    public void visualize() {
        System.out.println(toString());
    }

    @Override
    public String toString() {
        String out = "";
        if (length == 0) {
            out = "[ ]";
            return out;
        }

        out += "[ ";

        IntNode item = head;
        while(item != null) {
            out += item.getData();
            item = item.getLink();
            if (item != null) out += ", ";
        }

        out += " ]";
        return out;
    }

    /**
     * Returns the index of the data to search
     * @param data
     * @return
     */
    public int search(Integer data) {
        int distance = 0;

        IntNode item = head;
        while(item != null) {
            if (data == item.getData()) return distance;
            distance++;
            item = item.getLink();
        }

        return -1;
    }
}