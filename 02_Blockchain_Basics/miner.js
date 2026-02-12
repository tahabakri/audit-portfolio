const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let transactions = [];

    // 1. Fill the block (MAX 10 txs OR until mempool is empty)
    while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
        // .pop() takes the last transaction from the mempool
        transactions.push(mempool.pop());
    }

    // 2. Create the block object with the ID and Transactions
    const block = { id: blocks.length, transactions };

    // 3. Hash the block (AND convert to string!)
    const hash = SHA256(JSON.stringify(block)).toString();

    // 4. Add the hash to the block
    block.hash = hash;

    // 5. Push to the chain
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool,
};