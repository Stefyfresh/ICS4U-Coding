public class TestIntBST {
    public static void main(String[] args) {
        if (testTraversal()) System.out.println("Test passed: testTraversal & testAdd :)");
        else System.out.println("Test failed: testTraversal :(");

        if (testRemove()) System.out.println("Test passed: testRemove :)");
        else System.out.println("Test failed: testRemove :(");


    }

    private static boolean testRemove() {
        IntBinarySearchTree bst = getList();

        bst.remove(11);
        if (!bst.inOrderTraversal().trim().equals("1 3 6 7 8 9 13")) return false;
        
        bst.remove(13);
        if (!bst.inOrderTraversal().trim().equals("1 3 6 7 8 9")) return false;

        bst.remove(8);
        if (!bst.inOrderTraversal().trim().equals("1 3 6 7 9")) return false;

        bst.remove(100);
        if (!bst.inOrderTraversal().trim().equals("1 3 6 7 9")) return false;
        
        bst = new IntBinarySearchTree();
        bst.add(3);
        bst.remove(3);
        if (!bst.inOrderTraversal().trim().equals("")) return false;

        bst.add(3);
        bst.add(2);
        bst.remove(3);
        if (!bst.inOrderTraversal().trim().equals("2")) return false;


        return true;
    }

    private static boolean testTraversal() {
        IntBinarySearchTree bst = getList();

        if (!bst.inOrderTraversal().trim().equals("1 3 6 7 8 9 11 13")) return false;

        if (!bst.preOrderTraversal().trim().equals("6 3 1 8 7 13 9 11")) return false;

        if (!bst.postOrderTraversal().trim().equals("1 3 7 11 9 13 8 6")) return false;

        return true;
    }

    private static IntBinarySearchTree getList() {
        IntBinarySearchTree bst = new IntBinarySearchTree();

        bst.add(6);
        bst.add(8);
        bst.add(3);
        bst.add(1);
        bst.add(13);
        bst.add(9);
        bst.add(7);
        bst.add(11);

        return bst;
    }
}
