# Blockchain Structure – Auditor Notes

## 1. The Network (P2P)
* **Definition:** A network where all computers (Nodes) are equal. There is no "Supernode" or "Admin".
* **Resilience:** If one node goes offline, the network keeps running because everyone else has a copy of the data.

## 2. The Block (The Container)
A block contains these key pieces of data:
1.  **Index:** The block height (e.g., 0, 1, 2).
2.  **Timestamp:** When it was created (Unix time).
3.  **Data:** The transactions (e.g., "Alice -> Bob 5 BTC").
4.  **Previous Hash:** The link to the parent block.
5.  **Hash:** The fingerprint of *this* block.
6.  **Nonce:** The random number used to solve the mining puzzle.

## 3. Immutability (The Security)
* **The "Avalanche" Effect:** If an attacker changes ONE byte of data in Block 10...
    * Block 10's Hash changes completely.
    * Block 11 (which points to Block 10) now has a broken link.
    * The attacker must re-mine Block 10, Block 11, and every block after it.
* **Result:** Changing history is mathematically impossible without "Trillions of years" of energy.