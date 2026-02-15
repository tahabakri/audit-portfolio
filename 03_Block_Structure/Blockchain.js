const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block("Genesis Block") ];
    }

    addBlock(newBlock) {
        // 1. Find the previous block (It's the last one in the list)
        // Array index is length minus 1
        const previousBlock = this.chain[this.chain.length - 1];

        // 2. Take the fingerprint (Hash) of that previous block
        // And save it inside the NEW block
        newBlock.previousHash = previousBlock.toHash();

        // 3. Now push the new block to the chain
        this.chain.push(newBlock);
    }
}

module.exports = Blockchain;