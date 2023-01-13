public class ListTest {
    public static void main(String[] args) {
        // IntLinkedList test = new IntLinkedList();
        // test.visualize();
        // test.add(1);
        // test.visualize();
        // test.add(2);
        // test.visualize();
        // test.add(1, 3);
        // test.visualize();
        // test.remove(3);
        // test.visualize();
        // test.add(4);
        // test.visualize();
        // test.add(5);
        // test.visualize();
        // test.addFront(6);
        // test.visualize();
        // test.add(3, 3);
        // test.visualize();
        // test.remove(15);
        // test.visualize();
        testAddNodes();
        // testRemoveNodes();
    }

    private static void testRemoveNodes() {
        IntLinkedList list = new IntLinkedList();
        list.remove(2);
        list.visualize();

        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.visualize();

        System.out.println(list.remove(3));
        System.out.println(list.remove(1));
        System.out.println(list.remove(5));
        list.visualize();

        list.remove(23);
        list.visualize();
        
        list.removeFront();
        list.visualize();

        System.out.println(list.removeFront());
        list.visualize();
    }

    private static void testAddNodes() {
        IntLinkedList list = new IntLinkedList();

        list.add(1);
        list.add(2);
        list.add(3);
        list.visualize();

        list.addFront(4);
        list.addFront(5);
        list.visualize();

        list.add(1, 6);
        list.add(0, 7);
        list.add(list.size(), 8);
        System.out.println(list.search(4));
        System.out.println(list.search(23));
        list.visualize();
    }
}
