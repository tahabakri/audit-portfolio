class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        let currentLayer = this.leaves;

        while (currentLayer.length > 1) {
            let nextLayer = [];
            for (let i = 0; i < currentLayer.length; i += 2) {
                const left = currentLayer[i];
                const right = currentLayer[i + 1];
                nextLayer.push(this.concat(left, right));
            }
            currentLayer = nextLayer;
        }

        return currentLayer[0];
    }
}

module.exports = MerkleTree;
