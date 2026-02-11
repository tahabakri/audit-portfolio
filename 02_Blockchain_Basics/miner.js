const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    // TODO: add transaction to mempool
    mempool.push(transaction);
}

function mine() {
    if (mempool.length === 0) {
        console.log('No transaction to mine.');
        return;
    }

    const block = {
        id: blocks.length,
        transactions: [...mempool],
        nonce: 0
    };

    while (true) {
        const hash = SHA256(JSON.stringify(block)).toString();
        const hashInt = BigInt(`0x${hash}`);

        if (hashInt < TARGET_DIFFICULTY) {
            block.hash = hash;
            blocks.push(block);
            console.log(`Block successfully mined! Nonce: ${block.nonce}, Hash: ${hash}`);
            // Clear mempool for next block
            mempool.length = 0;
            break;
        }

        block.nonce++;
    }
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};

// --- TEST CODE (Delete before submitting to Alchemy) ---
console.log("1. Mempool before:", mempool);

// Alice sends 5 BTC to Bob
addTransaction({ sender: "Alice", to: "Bob", amount: 5 });
console.log("2. Mempool after:", mempool);

console.log("3. Mining...");
mine();
console.log("4. Blocks:", blocks);
console.log("5. Mempool after mining:", mempool);