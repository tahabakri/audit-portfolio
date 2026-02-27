// I am creating a Merkle Tree class to build a tree from leaves and compute the Merkle root
class MerkleTree {
    // I store the leaves of the tree and a function to combine/hash nodes
    constructor(leaves, concat) {
        this.leaves = leaves;      // These are the individual data items (e.g., ['A', 'B', 'C', 'D'])
        this.concat = concat;      // This is the function I use to securely combine two nodes
    }

    // I recursively compute the Merkle root from a given array of leaves
    getRoot(leaves = this.leaves) {
        // Base case: If there is only one leaf, I have reached the root
        if (leaves.length === 1) {
            return leaves[0];      // This is the Merkle root
        }

        // I will create a new layer by combining every two nodes
        const layer = [];

        for (let i = 0; i < leaves.length; i += 2) {  // Step by 2 to process pairs
            const left = leaves[i];                   // Left child of the pair
            const right = leaves[i + 1];              // Right child of the pair (may be undefined)

            // Odd-leaf rule:
            // If there is no right child (odd number of leaves),
            // carry the left leaf up unchanged to the next layer
            if (right !== undefined) {                
                layer.push(this.concat(left, right)); // Combine left + right if both exist
            } else {
                layer.push(left);                     // Carry lonely leaf up unchanged
            }

            // At this point, every iteration contributes **exactly one node** to the next layer
        }

        // Recursively compute the root of this new layer
        // This keeps repeating until only one node remains (the Merkle root)
        return this.getRoot(layer);
    }
}

// I export the class so I can use it in other files or tests
module.exports = MerkleTree;