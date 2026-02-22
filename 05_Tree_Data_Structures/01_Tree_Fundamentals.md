# Logic: Tree Data Structures in Blockchain

## 1. Core Vocabulary
- **Node:** A single "data container."
- **Root:** The top-most node (the only node with no parent). In blockchain, the **Root Hash** is usually what we store in the block header.
- **Leaf:** A node at the very bottom (has no children). In blockchain, **Leaf Nodes = Transactions**.
- **Parent/Child:** The hierarchical relationship.

## 2. Binary Trees
- **The Rule:** Each parent can have a maximum of **TWO** children.
- **Why it matters:** Blockchains use Binary Trees (Merkle Trees) because they are the most efficient way to summarize a large list of transactions into a single Root Hash.

## 3. Big O Notation (The Security Perspective)
- **Linear Search $O(n)$:** Slow. If the chain grows, the work grows. (Vulnerable to spam).
- **Tree Search $O(\log n)$:** Fast. Even if the data grows to 1 million items, the work only increases by a tiny amount. 
- **Auditor Note:** We always prefer $O(\log n)$ operations because they are "Gas Efficient" and harder to crash with spam.