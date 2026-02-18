# Accounting Models: UTXO vs. Account

## 1. Account-Based Model (Ethereum)
- **Concept:** Like a bank account balance.
- **Data:** `Address => Balance` (e.g., `0xTaha => 50 ETH`).
- **Transaction:** "Subtract X from A, Add X to B."
- **Audit Risk:** **Replay Attacks**. If the system doesn't track a 'nonce', a hacker can broadcast the same "Pay me" transaction over and over.

## 2. UTXO Model (Bitcoin)
- **Concept:** Unspent Transaction Outputs. Like physical cash/coins.
- **Data:** A list of "Unspent Coins." You don't "have 5 BTC," you "own coins that add up to 5 BTC."
- **Transaction:** Consumes old coins (inputs) and creates new coins (outputs).
- **Audit Risk:** **Complexity**. It's harder to track state-heavy logic (like a complex game or a loan) using only "coins."