# Ethereum Block Roots

Ethereum blocks contain a **block header** that stores important cryptographic commitments about the block.

Three important fields in the block header are:

- State Root
- Transactions Root
- Receipts Root

---

## Transactions Root

The Transactions Root commits all transactions included in the block.

It proves **which transactions were executed**.

Example transaction data:

- from
- to
- value
- gasPrice
- input data

This data is stored in a Merkle Tree.

---

## Receipts Root

The Receipts Root commits the **results of transactions**.

Transaction receipts include:

- gas used
- success or failure
- emitted events (logs)

This root allows nodes to verify **what happened during execution**.

---

## State Root

The State Root represents the hash of the **Merkle Patricia Trie** storing the Ethereum world state.

The trie stores key-value pairs:
address → account state


Account state contains:

- balance
- nonce
- storageRoot
- codeHash

If any account state changes, the State Root changes.

---

## Mental Model

Transactions Root → what was executed  
Receipts Root → what happened during execution  
State Root → final world state after execution
Key in trie → address; value in trie → account state (balance, nonce, storage, codeHash)

Ethereum cannot use a simple Merkle Tree for state because account data (balance and nonce) changes after every transaction.  
Rebuilding a full Merkle Tree for constant updates would be inefficient, so Ethereum uses a Merkle Patricia Trie for efficient state updates and proofs.

State Root allows light clients to verify the balance or state of an address using a Merkle proof without downloading the entire Ethereum state.