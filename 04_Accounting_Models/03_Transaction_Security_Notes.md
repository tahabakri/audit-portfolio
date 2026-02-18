# Logic: Transaction Security (UTXO Model)

## 1. The Core Concept
A transaction in a UTXO system (like Bitcoin) does not just "send money." It acts as a recycler:
*   **Inputs:** Old coins that are "destroyed" (marked as spent).
*   **Outputs:** New coins that are created for the recipient.

## 2. Double-Spend Protection (The Logic)
As an auditor, the `execute()` function is the "Security Guard" of the transaction. It must follow a strict order of operations: **Check -> Act.**

### The "Gatekeeper" Loop:
For every input coin being used:
1.  **The Check:** Verify if the coin's `spent` property is `true`.
2.  **The Revert:** If it is already spent, we must `throw new Error`. This stops the transaction and prevents fraud.
3.  **The Action:** If (and only if) the coin is fresh, we call `.spend()` to mark it as used.

## 3. Why we use "Throw"
In blockchain security, we don't just "print an error message." We use `throw` because:
*   It stops the execution immediately.
*   It ensures that if one coin in a bag of 10 is bad, the **entire** transaction fails. No partial success allowed.

## 4. Auditor's Takeaway: Order of Operations
A common bug in smart contracts is performing an action **before** the check. 
*   **Correct:** `if (spent) { throw } else { spend() }`
*   **Incorrect:** `spend(); if (spent) { throw }` -> This would cause the transaction to fail even if the coin was valid!

## 5. Vocabulary
*   **TXO:** Transaction Output (A coin).
*   **UTXO:** Unspent Transaction Output (A fresh coin).
*   **Double Spend:** An attempt to use the same digital coin twice.