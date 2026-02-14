# Logic: Data Integrity

## The Goal
We need to prove that the data hasn't changed since the block was created.

## The Mechanism
1.  **Store Data:** `this.data = "Alice pays Bob"`
2.  **Hash Data:** `SHA256("Alice pays Bob")` -> `0x123...`

## The Audit Check
If a hacker changes the data to "Alice pays Bob **0**", the hash recalculates to `0x999...`.
*   **Mismatch:** The block's ID (hash) no longer matches its contents.
*   **Conclusion:** The block is invalid/tampered.

## Auditor Note
Always check **what** is being hashed. If a developer forgets to include `amount` in the hash function, a hacker can change the amount without changing the hash!