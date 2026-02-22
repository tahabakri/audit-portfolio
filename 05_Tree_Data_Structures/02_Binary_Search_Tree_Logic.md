# Logic: Binary Search Tree (BST)

## 1. The Rule (Invariants)
- **Left Child:** Always contains a value SMALLER than the parent.
- **Right Child:** Always contains a value LARGER than the parent.

## 2. Searching (The "Walk")
Searching a BST is efficient because we "discard" half of the remaining tree with every step.
- **Complexity:** $O(\log n)$. 
- **Comparison:** In a simple list of 1,000 items, you might check 1,000 times. In a BST, you check at most ~10 times.

## 3. Auditor Takeaway: Denial of Service (DoS)
As an auditor, I look for data structures that are fast. 
- If a blockchain used a simple Array to store transactions, a hacker could send millions of transactions to make the "search" slow and crash the nodes.
- By using Trees, we ensure the network stays fast even as it grows.

## 4. Key Logic Pattern (The Loop)
```javascript
while (currentNode !== null) {
    if (match) return true;
    if (smaller) goLeft;
    else goRight;
}