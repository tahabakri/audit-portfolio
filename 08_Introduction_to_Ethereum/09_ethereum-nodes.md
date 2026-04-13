# Ethereum Nodes

## 1. Overview

Ethereum nodes are computers that:
- store blockchain data
- validate transactions
- execute smart contracts

They maintain the integrity of the Ethereum network.

---

## 2. Full Nodes

Full nodes:
- store all blocks and transactions
- execute smart contract code
- verify correctness of the network

### Downsides:
- expensive to run
- require high storage and computation

---

## 3. Data Storage (High-Level)

Ethereum stores data using Merkle Patricia Tries.

### Key idea:
- data is stored in a tree structure
- any change → changes root hash
- allows verification without full data

---

## 4. Types of Tries (Do NOT memorize)

- State Trie → global account state
- Storage Trie → contract storage
- Transactions Trie → transactions per block
- Receipts Trie → transaction results

---

## 5. Key Takeaway

- Nodes = backbone of Ethereum
- They store, validate, and execute everything
- Developers usually interact with nodes via JSON-RPC (not directly)