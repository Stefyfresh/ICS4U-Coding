public class Main {
    public static void main(String[] args) {
        IntLinkedList test = new IntLinkedList();
        test.visualize();
        test.add(1);
        test.visualize();
        test.add(2);
        test.visualize();
        test.add(1, 3);
        test.visualize();
        test.remove(3);
        test.visualize();
        test.add(4);
        test.visualize();
        test.add(5);
        test.visualize();
        test.addFront(6);
        test.visualize();
        test.add(3, 3);
        test.visualize();
        test.remove(15);
        test.visualize();
    }
}
