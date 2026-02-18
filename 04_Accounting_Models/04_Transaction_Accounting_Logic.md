# Logic: Transaction Accounting & Atomic Checks

## 1. The Math: Conservation of Value
In a UTXO transaction, money is not created or destroyed (except by miners).
*   **Input Sum:** The total value of all "old" coins being used.
*   **Output Sum:** The total value of all "new" coins being created.

### The Accounting Rule:
`Total Input >= Total Output`
*   If **Input < Output**, the user is trying to create fake money. The system must `throw`.
*   If **Input > Output**, the leftover money is not lost—it is paid to the miner as a fee.

## 2. The "Atomic" Pattern (All or Nothing)
As an auditor, I learned that the order of code lines determines security. We organized the `execute()` function into 4 stages to ensure "Atomicity."

### Stage 1 & 2: Counting and Validation
We count everything first. We do not change any data yet. We only check if the math makes sense.

### Stage 3: The Police Check
We loop through every input coin to see if any have the `spent: true` flag. 
**Crucial:** We do this check for ALL coins before we mark any of them as spent.

### Stage 4: The Action
Only after every check in Stages 1, 2, and 3 passes, do we finally call `coin.spend()`.

## 3. Why this order matters (Auditor's Insight)
If we mark the 1st coin as "spent" but then find that the 5th coin is invalid, the transaction fails. 
*   If we "Acted" before we "Checked," the 1st coin would stay marked as "spent" in the computer's memory even though the transaction failed.
*   By using this **Check -> Act** pattern, we ensure the transaction is **Atomic**: it either succeeds completely or fails completely with no side effects.

## 4. Vocabulary
*   **Atomicity:** A property where a suite of operations either all occur or none occur.
*   **Inflation Attack:** Attempting to create more output value than was provided in the inputs.
*   **Miner Fee:** The difference between Total Input and Total Output.