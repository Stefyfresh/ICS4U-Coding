public class IntLinkedListQueue {
    private IntLinkedList data;

    public IntLinkedListQueue() {
        data = new IntLinkedList();
    }

    public boolean isEmpty() {
        return data.isEmpty();
    }

    public void clear() {
        data = new IntLinkedList();
    }

    public boolean enqueue(Integer el) {
        return data.add(el);
    }
    
    public Integer dequeue() {
        return data.removeFront();
    }

    public Integer peek() {
        return data.getFront();
    }
}
