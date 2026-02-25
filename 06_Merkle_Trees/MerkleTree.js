// I am creating a Merkle Tree class to build a tree from leaves and compute the Merkle root
class MerkleTree {
    // I store the leaves of the tree and a function to combine/hashes nodes
    constructor(leaves, concat) {
        this.leaves = leaves;      // These are the individual data items (e.g., ['A', 'B', 'C', 'D'])
        this.concat = concat;      // This is the function I use to combine two nodes securely
    }

    // I recursively compute the Merkle root from a given array of leaves
    getRoot(leaves = this.leaves) {
        // Base case: If there is only one leaf, I have reached the root
        if (leaves.length === 1) {
            return leaves[0];      // This is the Merkle root
        }

        // I will create a new layer by combining every two nodes
        const layer = [];
        for (let i = 0; i < leaves.length; i += 2) {  // I step by 2 to pair leaves
            const left = leaves[i];                  // This is the left child of the pair
            const right = leaves[i + 1];             // This is the right child of the pair
            // I combine the two children using the concat function and push to the next layer
            layer.push(this.concat(left, right));
        }

        // I recursively call getRoot on the new layer until I reach the root
        return this.getRoot(layer);
    }
}

// I export the class so I can use it in other files or tests
module.exports = MerkleTree;