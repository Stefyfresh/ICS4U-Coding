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
        if (root == null) return "";
        String result = "";
        result += inOrderTraversal(root, result);
        return result;
    }

    public String preOrderTraversal() {
        if (root == null) return "";
        String result = "";
        result += preOrderTraversal(root, result);
        return result;
    }

    public String postOrderTraversal() {
        if (root == null) return "";
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
        if (treeRoot == null) return null;
        if (treeRoot.getRight() == null) return treeRoot;
        return findLargest(treeRoot.getRight());
    }

    public boolean remove(Integer val) {
        return removeRecursive(root, val);
    }

    private boolean removeRecursive(IntBSTNode treeRoot, Integer val) {
        if (treeRoot == null) return false;

        Integer compare = treeRoot.getData();
        // Left 
        if (val < compare) {
            if (treeRoot.hasLeft() && treeRoot.getLeft().getData() == val) {
                IntBSTNode node = treeRoot.getLeft();
                if (node.numChildren() == 0) treeRoot.setLeft(null);
                else if (node.numChildren() == 1) {
                    if (node.hasLeft()) {
                        treeRoot.setLeft(node.getLeft());
                    } else if (node.hasRight()) {
                        treeRoot.setLeft(node.getRight());
                    }
                }
            }
            return removeRecursive(treeRoot.getLeft(), val);
        }
        // Right
        if (val > compare) {
            if (treeRoot.hasRight() && treeRoot.getRight().getData() == val) {
                IntBSTNode node = treeRoot.getRight();
                if (node.numChildren() == 0) treeRoot.setRight(null);
                else if (node.numChildren() == 1) {
                    if (node.hasLeft()) {
                        treeRoot.setRight(node.getLeft());
                    } else if (node.hasRight()) {
                        treeRoot.setRight(node.getRight());
                    }
                }
            }
            return removeRecursive(treeRoot.getRight(), val);
        }

        if (val == compare) {
            if (treeRoot.numChildren() == 2) {
                treeRoot.setData(findLargest(treeRoot.getLeft()).getData());
                if (!treeRoot.getLeft().hasRight()) treeRoot.setLeft(null);
                else removeLargest(treeRoot.getLeft());
            } else if (treeRoot.numChildren() == 0) {
                root = null;
            } else if (treeRoot.numChildren() == 1) {
                treeRoot.setData((treeRoot.hasLeft()) ? treeRoot.getLeft().getData() : treeRoot.getRight().getData());
                if (!treeRoot.getLeft().hasRight()) treeRoot.setLeft(null);
                else removeLargest(treeRoot.getLeft());
            }
        }
        return true;
    }

    private void removeLargest(IntBSTNode treeRoot) {
        if (treeRoot.getRight() == null) throw new IllegalStateException();
        if (treeRoot.getRight().getRight() == null){
            treeRoot.setRight(null);
            return;
        } 
        removeLargest(treeRoot.getRight());
    }

    public void visualize() {

    }
}
