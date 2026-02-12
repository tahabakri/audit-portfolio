# Blockchain & Proof-of-Work Notes

These notes summarize what I am learning about blockchain, mining, mempool, and proof-of-work, step by step.

## 1. Blocks

- A block **stores transactions** in the blockchain.
- Each block has a **unique ID** (its height in the chain).
- Blocks contain a **hash** calculated from their contents.
- Once mined, blocks are **broadcast** to the network.

## 2. Mempool

- The mempool is a **waiting room** for transactions.
- Transactions are **broadcast** by users and stored in the mempool.
- Miners take transactions from the mempool when creating a new block.
- Transactions are **removed** from the mempool after being included in a block.

## 3. Proof-of-Work (PoW)

- PoW is **computational work** miners do to secure the blockchain.
- Miners repeatedly change a **nonce** until the **hash meets the target difficulty**.
- Target difficulty ensures **blocks are hard to mine**, making cheating expensive.
- Once a valid hash is found, the block is **added to the chain** and broadcasted.
- Transactions in the block are now **confirmed** and removed from mempool.

## 4. Mining Steps (Simplified)

1. Miner picks transactions from the **mempool**.
2. Miner creates a new **block** with:
   - `id` = current block height
   - `transactions` = picked transactions
   - `nonce` = 0 initially
3. Miner calculates **hash** of the block.
4. If hash < target difficulty → **block mined**
   - Else → increment `nonce` and try again
5. Broadcast mined block to the **network**
6. Remove included transactions from mempool
