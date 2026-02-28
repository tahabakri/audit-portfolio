const MerkleTree = require('./MerkleTree');

// A simple mock hash/concat function so we can clearly see how nodes combine
function concat(a, b) {
    return `Hash(${a}, ${b})`;
}

const leaves = ['A', 'B', 'C', 'D', 'E'];
const tree = new MerkleTree(leaves, concat);

console.log('Leaves:', leaves);
console.log('\n===== CALCULATING ROOT =====');
console.log('Root:', tree.getRoot());

console.log('\n===== CALCULATING PROOF FOR "C" (Index 2) =====');
const proof = tree.getProof(2);
console.log(proof);
