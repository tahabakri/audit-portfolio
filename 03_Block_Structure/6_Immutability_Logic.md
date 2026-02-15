# Logic: Immutability (The Chain Link)

## The Mechanism
1.  **Block 1 Hash:** `0xABC`
2.  **Block 2 Content:** `Data + "0xABC"` -> Hash: `0xDEF`
3.  **Block 3 Content:** `Data + "0xDEF"` -> Hash: `0x123`

## The Attack Scenario
A hacker goes back to Block 1 and changes a transaction.
1.  Block 1 Hash changes to `0xBAD`.
2.  Block 2 checks its `previousHash`. It expects `0xABC` but sees `0xBAD`.
3.  **Mismatch!** Block 2 becomes invalid.
4.  Block 3 becomes invalid.
5.  **Result:** To hack Block 1, you must re-mine EVERY block that came after it. This is computationally impossible on a large network.

## Auditor Note
This is why we say "The deeper the block, the safer it is." A block with 1 confirmation (new) is risky. A block with 6 confirmations (1 hour old) is mathematically secure.