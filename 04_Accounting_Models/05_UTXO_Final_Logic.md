# Logic: UTXO Integrity and Miner Economics

## 1. Transaction Flow (The Lifecycle)
I learned that a UTXO transaction is a process of destroying and creating. 
- **Inputs:** Old coins that MUST be fresh (unspent). 
- **Outputs:** New coins that MUST start as fresh.
- **The Transition:** Once the transaction executes, the Inputs are "consumed" and become forever unspendable.

## 2. The Atomic "Security Guard" Pattern
As an auditor, the most important takeaway is the **Checks-Effects-Interactions** pattern. I organized the code into stages to prevent "Bricked" funds or partial failures:
1. **Validation (Checks):** Count the money and verify the 'spent' status. If anything is wrong, `throw` immediately before changing any data.
2. **Execution (Effects):** Only after all checks pass, mark the input coins as `spent = true`.
3. **Observation:** I caught a bug where marking **Output** coins as spent would make them useless to the receiver. Outputs must remain `spent = false` until they are used in a future transaction.

## 3. The Law of Conservation of Value
- **Accounting Rule:** `Total Input >= Total Output`.
- **Inflation Attack:** If `Input < Output`, the code would create money from nothing. I implemented a check to revert this.
- **Miner Fees:** If `Input > Output`, the leftover value is the `fee`. 
- **Economic Insight:** Transaction fees are an incentive for miners to prioritize a transaction and will eventually be the only reward for securing the network.

## 4. Technical Context: Bitcoin Script
I learned that real Bitcoin UTXOs are locked with a **"Locking Script"** (scriptPubKey). 
- To spend them, the user must provide an **"Unlocking Script"** (Witness).
- This usually requires a digital signature (from Week 1) and a Public Key.
- **Auditor Note:** In Bitcoin, the "Address" is actually a hash of the Public Key, adding another layer of privacy and security.