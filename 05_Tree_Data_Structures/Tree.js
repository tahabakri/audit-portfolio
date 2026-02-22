class Tree {
    constructor() {
        this.root = null;
    }

    hasNode(data) { 
        let currentNode = this.root;

        while (currentNode !== null) {
            if (data === currentNode.data) {
                return true;
            }
            if (data < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

       
        return false; 
    }

    addNode(node) {
        if(!this.root) {
            this.root = node;
            return;
        }

        let currentNode = this.root;

        while(true) {
            if (node.data < currentNode.data) {
                if(currentNode.left === null) {
                    currentNode.left = node;
                    break;
                } else {
                    currentNode = currentNode.left;
                }
            } else {
                if(currentNode.right === null) {
                    currentNode.right = node;
                    break;
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
    }
}

module.exports = Tree;