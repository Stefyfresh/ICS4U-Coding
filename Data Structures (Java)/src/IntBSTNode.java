public class IntBSTNode {
    private IntBSTNode left;
    private IntBSTNode right;
    private Integer data;


    public IntBSTNode(Integer data) {
        this.data = data;
    }

    public IntBSTNode(IntBSTNode left, IntBSTNode right, int data) {
        this.left = left;
        this.right = right;
        this.data = data;
    }

    public IntBSTNode getLeft() {
        return left;
    }

    public void setLeft(IntBSTNode left) {
        this.left = left;
    }

    public IntBSTNode getRight() {
        return right;
    }

    public void setRight(IntBSTNode right) {
        this.right = right;
    }

    public Integer getData() {
        return data;
    }

    public void setData(Integer data) {
        this.data = data;
    }

    public boolean hasLeft() {
        return left != null;
    }

    public boolean hasRight() {
        return right != null;
    }
}
