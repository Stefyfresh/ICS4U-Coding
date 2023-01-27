public class IntBinarySearchTree {
    private IntBSTNode root;

    public IntBinarySearchTree() {
        this.root = null;
    }

    public IntBSTNode add(Integer val) {
        if (root == null) root = new IntBSTNode(val);
        return addRecursive(root, val);
    }

    public IntBSTNode find(Integer val) {
        return searchRecursive(root, val);
    }
    
    public String inOrderTraversal() {
        String result = "";
        result += inOrderTraversal(root, result);
        return result;
    }

    public String preOrderTraversal() {
        String result = "";
        result += preOrderTraversal(root, result);
        return result;
    }

    public String postOrderTraversal() {
        String result = "";
        result += postOrderTraversal(root, result);
        return result;
    }

    public String preOrderTraversal(IntBSTNode treeRoot, String result) {
        result += treeRoot.getData() + " ";

        if (treeRoot.hasLeft()) {
            result = preOrderTraversal(treeRoot.getLeft(), result);
        } 

        if (treeRoot.hasRight()) {
            result = preOrderTraversal(treeRoot.getRight(), result);
        }

        return result;
    }

    private String postOrderTraversal(IntBSTNode treeRoot, String result) {
        if (treeRoot.hasLeft()) {
            result = postOrderTraversal(treeRoot.getLeft(), result);
        } 
        
        if (treeRoot.hasRight()) {
            result = postOrderTraversal(treeRoot.getRight(), result);
        }
        result += treeRoot.getData() + " ";
        return result;
    }

    private String inOrderTraversal(IntBSTNode treeRoot, String result) {
        if (treeRoot.hasLeft()) {
            result = inOrderTraversal(treeRoot.getLeft(), result);
        } 
        result += treeRoot.getData() + " ";

        if (treeRoot.hasRight()) {
            result = inOrderTraversal(treeRoot.getRight(), result);
        }
        return result;
    }

    /**
     * Recursive method
     * @param treeRoot - Root of the subtree
     * @param val - Data to add to the tree
     * @return A reference to the node added
     */
    private IntBSTNode addRecursive(IntBSTNode treeRoot, Integer val) {
        if (val > treeRoot.getData()) {
            if (treeRoot.hasRight()) {
                return addRecursive(treeRoot.getRight(), val);
            } else {
                IntBSTNode child = new IntBSTNode(val);
                treeRoot.setRight(child);
                return child;
            }
        } else if (val < treeRoot.getData()) {
            if (treeRoot.hasLeft()) {
                return addRecursive(treeRoot.getLeft(), val);
            } else {
                IntBSTNode child = new IntBSTNode(val);
                treeRoot.setLeft(child);
                return child;
            }
        } else {
            return root;
        }
    }

    /**
     * Recursive method
     * @param treeRoot - Root of the subtree
     * @param val - Data to search in the tree
     * @return A reference to the node added
     */
    private IntBSTNode searchRecursive(IntBSTNode treeRoot, Integer val) {
        if (val == treeRoot.getData()) return treeRoot;

        else if (val > treeRoot.getData() && treeRoot.hasRight()) {
            return searchRecursive(treeRoot.getRight(), val);
        } else if (val < treeRoot.getData() && treeRoot.hasLeft()) {
            return searchRecursive(treeRoot.getLeft(), val);
        }

        return null;
    }

    /**
     * Recursive method
     * @param treeRoot - Root of the subtree
     * @param val - Data to search in the tree
     * @return A reference to the node added
     */
    // private IntBSTNode searchParentRecursive(IntBSTNode treeRoot, Integer val) {
    //     if (val == treeRoot.getData()) return null;

    //     else if (val > treeRoot.getData() && treeRoot.hasRight()) {
    //         if (treeRoot.getRight().getData() == val) return 
    //         return searchRecursive(treeRoot.getRight(), val);
    //     } else if (val < treeRoot.getData() && treeRoot.hasLeft()) {
    //         return searchRecursive(treeRoot.getLeft(), val);
    //     }

    //     return null;
    // }

    private IntBSTNode findLargest(IntBSTNode treeRoot) {
        if (treeRoot.getRight() == null) return treeRoot;
        return findLargest(treeRoot.getRight());
    }

    public boolean remove(Integer val) {
        return removeRecursive(root, val);
    }

    private boolean removeRecursive(IntBSTNode treeRoot, Integer val) {
        if (treeRoot == null) return false;

        // Not working?
        Integer compare = treeRoot.getData();
        if (val < compare) {
            if (treeRoot.getLeft() == null) return false;
        }
        if (val > compare && treeRoot.getRight() == null) return false;

        if (compare == val) {
            if (numChildren(treeRoot) == 0) {
                treeRoot = null;
            } else if (!treeRoot.hasLeft()) {
                treeRoot = treeRoot.getRight();
            } else if (!treeRoot.hasRight()) {
                treeRoot = treeRoot.getLeft();
            } else if (numChildren(treeRoot) == 2) {
                treeRoot.setData(findLargest(treeRoot.getLeft()).getData());
                removeLargest(root.getLeft());
            }
        } else if (val > compare) {
            return removeRecursive(treeRoot.getRight(), val);
        } else if (val < compare) {
            return removeRecursive(treeRoot.getLeft(), val);
        }
        return true;
    }

    private void removeLargest(IntBSTNode treeRoot) {
        if (treeRoot.getRight() == null) treeRoot = null;
        removeLargest(treeRoot.getRight());
    }

    private int numChildren(IntBSTNode node) {
        int num = 0;
        if (node.hasLeft()) num++;
        if (node.hasRight())  num++;
        return num;
    }

    public void visualize() {

    }
}
