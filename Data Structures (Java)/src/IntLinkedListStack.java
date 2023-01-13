public class IntLinkedListStack {
    private IntLinkedList list;

    public IntLinkedListStack() {
        list = new IntLinkedList();
    }

    public void push(Integer data) {
        list.addFront(data);
    }

    public Integer pop() {
        return list.removeFront();
    }

    public Integer peek() {
        return list.getFront();
    }

    public int search(Integer data) {
        return list.search(data);
    }

    public boolean empty() {
        return list.isEmpty();
    }
}
