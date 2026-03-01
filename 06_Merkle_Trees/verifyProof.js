function verifyProof(proof, node, root, concat) {
    // 1. 'result' starts as our target leaf
    let result = node;

    // 2. We need a loop to go through every step in the proof
    for (let i = 0; i < proof.length; i++) {
        const neighbor = proof[i];
        
        // Logic to combine 'result' and 'neighbor' goes here...
        if (neighbor.left) {
            result = concat(neighbor.data, result);
        } else {
            result = concat(result, neighbor.data);
        }
    }

    // 3. Final Check: Does our result match the root?
    return result === root;
}

module.exports = verifyProof;