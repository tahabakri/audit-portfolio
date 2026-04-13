# Logic: Ethereum as a State Machine

## 1. The Core Definition
- **Read-only:** Anyone can look at the blockchain for free (no account needed).
- **Write (State Change):** Only an EOA (human with a private key) can change the blockchain.
- **The Vehicle:** The only way to change the state is a **Transaction**.

## 2. World State (The Global Spreadsheet)
- Ethereum is just one giant mapping: `Address => Account State`.
- **Account State** includes: `[Balance, Nonce, Code, Storage]`.
- A Block is a "Batch" of transactions that moves the world from State A to State B.

## 3. The Account Nonce (Transaction Ordering)
- **What it is:** A counter that tracks how many transactions an address has sent.
- **Why it exists:** To prevent **Replay Attacks**.
- **The Rule:** Transactions must be processed in order (0, 1, 2...). If you send a transaction with Nonce 10 while your current Nonce is 5, it will stay "Pending" forever until 6, 7, 8, and 9 are done.

## 4. Calldata (The `data` field)
- **Simple Transfer:** Usually empty (`0x`).
- **Contract Interaction:** Contains the "Method ID" and the "Arguments."
- **Definition:** Calldata is the read-only byte array where the transaction's input data is stored.
- **Auditor Note:** I must always audit how a contract parses its calldata to prevent "Injection" style attacks.

## 5. Gas Fees and Tips (Economic Incentives)
- **maxPriorityFeePerGas:** The "Tip" given directly to the validator.
- **maxFeePerGas:** The absolute maximum I am willing to pay (Base Fee + Tip).
- **Incentive Rule:** Higher tips get processed faster.
- **Auditor Note:** I must look for "Front-running" vulnerabilities. If a contract's logic depends on who gets there "first," an attacker can use high gas tips to win every time.

## 6. Transaction Reversion (The Safety Brake)
- **Concept:** If a transaction fails or runs out of gas, it is **Reverted**.
- **Atomicity:** The state resets to exactly how it was before the transaction started.
- **Economic Cost:** The user still pays for the gas consumed up to the point of failure.
- **Auditor Note:** I look for "Gas Griefing" bugs where a contract might intentionally waste a user's gas limit before reverting.

## 7. The Function Selector
- **Definition:** The first 4 bytes (8 hex characters) of a transaction's `data` field.
- **How it's made:** `keccak256("functionName(type1,type2)")` -> take the first 8 characters.
- **Auditor Note:** This is how the EVM knows which "room" in the contract to enter. If I see a transaction with `data: 0xa9059cbb`, I know immediately it is a "transfer" function, even before I see the code.