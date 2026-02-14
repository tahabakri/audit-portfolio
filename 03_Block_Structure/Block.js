const SHA256 = require('crypto-js/sha256');

class Block {
    // 1. The Setup: Receive data and save it
    constructor(data) {
        this.data = data;
    }

    // 2. The Hash: Use the saved data to create the fingerprint
    toHash() {
        // Instead of "Taha", we use 'this.data'
        return SHA256(this.data).toString();
    }
}

module.exports = Block;