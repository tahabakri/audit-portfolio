# Security Logic: 51% Attacks & Double Spends

## 1. The 51% Attack
*   **Definition:** When a single group controls more than 50% of the network's computing power (Hash Rate).
*   **Power:** They can **rewrite history** (reorganize blocks).
*   **Limitation:** They CANNOT steal people's private keys or create money out of thin air. They can only "undo" their own recent transactions.

## 2. Double Spending
*   **Definition:** Spending the same money twice.
*   **Mechanism:**
    1.  Send money to Merchant (Block 100).
    2.  Merchant ships goods.
    3.  Attacker rewrites Block 100 so the money goes back to themselves.
    4.  Attacker keeps goods + money.

## 3. The Defense: "Confirmations"
*   **Rule:** The deeper the block, the harder it is to rewrite.
*   **Auditor Advice:**
    *   For small amounts ($10): 1 confirmation (1 block) is fine.
    *   For large amounts ($1M): Wait for **6 confirmations** (Bitcoin) or **64+** (Ethereum).
    *   *Why?* It becomes exponentially expensive for an attacker to rewrite 6 blocks of history.

## 4. The Nonce Limit (Technical Note)
*   A `nonce` is only 32-bits (max 4 billion).
*   Miners often run out of nonces!
*   **Solution:** They change the **Timestamp** or the **Extra Nonce** in the Coinbase transaction to reset the puzzle.