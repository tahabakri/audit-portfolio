const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    // 1. Create the Block (The Envelope)
    const block = {
        id: blocks.length,  // The block ID
        transactions: [],  // Transactions array
        nonce: 0  // Start with nonce = 0
    };

    // 2. Add transactions from the mempool to the block
    while (block.transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
        const transaction = mempool.shift();  // Remove a transaction from mempool
        block.transactions.push(transaction);  // Add to block's transactions array
    }

    // 3. Perform Proof of Work (find a valid hash with a nonce)
    while (true) {
        const blockString = JSON.stringify(block);
        const hash = SHA256(blockString).toString();

        // Convert the hash to BigInt for comparison
        const intHash = BigInt(`0x${hash}`);

        // Check if the hash is less than the TARGET_DIFFICULTY
        if (intHash < TARGET_DIFFICULTY) {
            block.hash = hash;  // Set the block's hash
            break;  // Exit the loop
        }

        // If not, increment the nonce and try again
        block.nonce++;
    }

    // 4. Add the block to the blockchain (blocks array)
    blocks.push(block);
    console.log(`Block mined with ID: ${block.id}, Hash: ${block.hash}, Nonce: ${block.nonce}`);
}


module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool,
};