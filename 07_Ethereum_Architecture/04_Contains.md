# Logic: Trie Lookup (The `contains` Function)

## 1. The Goal: Verification
The `contains` function ensures we can verify if a specific string exists within our data structure. Crucially, it must distinguish between a **Full Word** and a **Prefix**.

## 2. Visual Logic: Searching the Path
Imagine we have inserted the word `"HAPPY"` into the Trie.

### Search Path Diagram:
```text
(root) -> H -> A -> P -> P -> Y* (isWord: true)
```

**Case A: Searching for "HAPPY"**
1. Traverse `H -> A -> P -> P -> Y`. 
2. We reach node `Y`. 
3. **Check `Y.isWord`?** → `true`. 
4. **Result:** `true` (Word found).

**Case B: Searching for "HAP" (Prefix Only)**
1. Traverse `H -> A -> P`.
2. We reach node `P`.
3. **Check `P.isWord`?** → `false`.
4. **Result:** `false` (Only a prefix exists, not the full word).

---

## 3. Step-by-Step Traversal
To verify a word like `"HEALTHY"`, the algorithm follows these strict rules:

1.  **Start at the Root:** Always begin the search from the entry point.
2.  **Iterate Through Letters:**
    -   Look up `node.children[letter]`.
    -   **If missing:** Immediately `return false` (The path is broken).
    -   **If present:** Move the pointer to that child node.
3.  **The "Full Stop" Check:** Once all letters are processed, the function **must** confirm `node.isWord`. Without this check, the function would incorrectly return `true` for partial words (prefixes).

---

## 4. Implementation Example
Here is the optimized implementation for the `Trie` class:

```javascript
contains(word) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
        const letter = word[i];

        // 1. If a letter in the sequence doesn't exist, the word is not here
        if (!node.children[letter]) {
            return false;
        }

        // 2. Step into the next node
        node = node.children[letter];
    }

    // 3. Return true only if the final node is marked as a word completion
    return node.isWord;
}
```

---

## 5. Auditor's Security Perspective
In the context of **Ethereum Architecture**, the `contains` logic (or its Trie equivalent) is vital for **State Verification**:

-   **Existence Proofs:** When a smart contract checks if an account has a specific balance, it is essentially performing a "Contains" lookup on the State Trie.
-   **Security Vulnerability (The "Null Path"):** If a lookup function doesn't properly handle missing nodes (e.g., trying to access a property on a `null` node), it could cause the entire node/client to crash—a potential **Denial of Service (DoS)** attack.
-   **Data Integrity:** The `isWord` flag acts as a critical security gate. If an implementation only checks if the path exists (prefix) rather than if the data entry is complete, it could lead to "Ghost Data" bugs where partial keys are treated as valid entries.

---

## 6. Reflection & Key Takeaways

### What I Learned
-   **No New Data:** Unlike `insert`, the `contains` function is "read-only." It should never modify the Trie or create new nodes.
-   **Two-Step Validation:** A successful lookup requires (1) a complete path and (2) a valid end-marker (`isWord`).

### Common Confusions (Solved)
-   **Why not just return `true` at the end of the loop?** 
    Because if the Trie contains "HEALTHY", searching for "HEALTH" would find the path, but "HEALTH" isn't the stored word. We need to check `isWord`.
-   **Current vs. Node naming:** 
    Using `node` or `current` makes it clear we are tracking a moving pointer through the tree's memory.

### My Understanding Now
The `contains` logic is the "Guardian" of the Trie. It ensures that only verified, complete data can be retrieved, protecting the system from partial matches and ensuring data integrity across the prefix-based structure.