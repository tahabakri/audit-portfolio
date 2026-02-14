const SHA256 = require('crypto-js/sha256');

class Block {
    toHash() {
        const data = {
            index: 1,  // Block number
            timestamp: Date.now(),  // Current timestamp
            previousHash: "0x123abc",  // Previous block's hash (just an example)
            data: "Taha says hala",  // Our placeholder data (could be transaction details)
            nonce: 604  // Example nonce value (needed for proof-of-work)
        };

        return SHA256(JSON.stringify(data)).toString();
    }
}

module.exports = Block;
