# Logic: Ethereum Tries & Block Architecture

## 1. The Three Roots of Ethereum
Unlike Bitcoin (which only has one Merkle Root for transactions), an Ethereum block header contains THREE roots:
1. **State Root:** The hash representing the current balances and smart contract data of EVERY account on Ethereum. (Dynamic / Changes constantly).
2. **Transaction Root:** The hash of the transactions that happened in *this specific block*. (Static / Never changes once mined).
3. **Receipts Root:** The hash of the "outcomes" of the transactions (like logs, events, and gas used). (Static).

## 2. Why Patricia Tries?
- Standard Merkle Trees = Great for verifying static data. Terrible for editing.
- Patricia Tries = Great for fast retrieval and updating of key-value pairs (like `Address => Balance`).

## 3. Auditor Takeaway
When I audit a Smart Contract, the variables I write (like `uint256 totalSwaps`) are stored in the **State Trie**. Changing these variables costs "Gas" because the Ethereum nodes have to traverse the Patricia Trie and update the State Root.

# 2. `Patricia Merkle Trie – Why Ethereum Uses It`
1. Ethereum accounts change frequently (balance, nonce, storage).
2. A simple Merkle Tree is inefficient for frequent updates.
3. Merkle Patricia Tries allow efficient updates + cryptographic verification.

# 3. `Patricia Merkle Trie – How It Works`
1. Nodes store only the necessary parts of the key (path).
2. Empty branches are skipped, saving space.
3. Updates only modify the path from the leaf to the root.

# 4. `Patricia Merkle Trie – Security Benefits`
1. Tamper-evident: Any change invalidates the root.
2. Efficient Proofs: Only the path nodes are needed for verification.
3. Space-Efficient: No need to store full keys or duplicate data.
