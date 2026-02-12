# Building a Miner – Learning Notes

## 1. The "Mempool" (The Waiting Room)
* **Concept:** A holding area for transactions that haven't been put into a block yet.
* **Why?** Transactions don't go straight to the blockchain. They must be picked up by a miner first.
* **Code:** `mempool.push(tx)` (Adds to the waiting list).

## 2. The Mining Loop (The Clerk)
* **Goal:** Move transactions from the Mempool -> New Block.
* **Constraint:** A block has a limit (`MAX_TRANSACTIONS`). We cannot overfill it.
* **The Logic:**
    ```javascript
    // While the block has space AND the mempool has transactions...
    while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
        // 1. Remove from Mempool (.pop)
        // 2. Add to Block (.push)
        transactions.push(mempool.pop());
    }
    ```

## 3. Auditor's Checklist (Bugs I Fixed)
* **The "Ghost" Bug:** If I didn't check `mempool.length > 0`, the loop would try to grab transactions that don't exist, crashing the miner or corrupting the block with `undefined` data.
* **The "String" Bug:** Hashing an object (JSON) directly gives a weird "Word Array." I must use `JSON.stringify()` to turn it into text, and `.toString()` to get the final hash string.


## 4. Finalizing the Block
* **Goal:** Once a block is mined successfully (hash meets target difficulty), it must be officially added to the chain.
* **The Steps:**
    1. **Include Transactions:** Bundle all transactions taken from the mempool into the block.
    2. **Assign ID:** Set the block's index (usually `blockchain.length`).
    3. **Store Hash:** Save the valid hash calculated during the mining process.
    4. **Commit:** Push the completed block into the `blocks` array.
* **Code:**
    ```javascript
    const block = {
        id: blockchain.length,
        transactions: transactions,
        hash: validHash
    };
    blockchain.push(block);
    ```
```