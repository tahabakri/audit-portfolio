class Node {
    constructor(data) {
        // 1. Set the value for this node
        this.data = data;
        
        // 2. Set the pointers to nothing (null) for now
        this.left = null;
        this.right = null;
    }
}

module.exports = Node;