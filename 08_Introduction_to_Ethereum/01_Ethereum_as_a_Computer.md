# Logic: The Ethereum World Computer

## 1. The Global Singleton
- There is only ONE Ethereum computer in the world. 
- It is not a physical box; it is the **consensus** of thousands of nodes.
- **Auditor Note:** Since it is "Singleton," everyone sees the same data at the same time. This is why we can trust its state.

## 2. Turing Completeness vs. Bitcoin
- **Bitcoin:** Cannot do loops. Simple logic only.
- **Ethereum:** Can do loops and complex logic (Turing Complete).
- **The Risk:** Infinite loops could crash the whole network.
- **The Solution:** **GAS.** Every operation costs money. If you loop forever, you run out of money and the loop stops.

## 3. Persistent vs. Temporary Memory
- **Memory:** Wiped clean after the transaction (Cheap).
- **Storage:** Saved on the blockchain forever (Very Expensive).
- **Auditor Note:** We always look for ways to use Memory instead of Storage to save the user money.

## 4. The Block Gas Limit (Security Boundary)
- **Concept:** Every Ethereum block has a maximum limit on how much total computation (Gas) it can contain.
- **Auditor Takeaway:** If I see a `for` loop that iterates over an array that has no maximum size (unbounded), I must flag it.
- **The Risk:** Eventually, the list will grow so large that the gas needed to run the loop exceeds the **Block Gas Limit**. The transaction will always fail, causing a permanent Denial of Service (DoS).

## 5. Gas as a Deterrent for Cheating
- **Concept:** Every operation costs Gas, paid in ETH.
- **Why it Matters:** If someone tries to spam the network or create fake accounts, the cost becomes prohibitive.
- **Auditor Note:** The Ethereum computer punishes bad behavior economically, not just technically.
- **Example:** Writing to Storage in a loop → SSTORE cost × iterations → very expensive → attack not worth it.

## 6. Verification by the Network (Consensus)
- **Concept:** Every full node runs the same code and sees the same state.
- **Auditor Note:** If a transaction is invalid or malicious, majority of nodes reject it.
- **The Risk:** A node that ignores consensus is effectively kicked out or its block is orphaned.
- **Key Insight:** Ethereum works because most nodes agree, not because a single node decides.

## 7. Forks and Upgrades
- **Concept:** Ethereum can upgrade itself via Hard Forks or Soft Forks.
- **Hard Fork:** Not backwards compatible. Old clients can’t follow new rules.
- **Soft Fork:** Backwards compatible. Old clients still function under new rules.
- **Auditor Note:** Forks are a way to adjust the Ethereum Virtual Machine, e.g., fixing gas costs, adding opcodes, or responding to attacks.
- **Example:** Tangerine Whistle Hard Fork increased gas costs to prevent DoS attacks.

## 8. The Ethereum Virtual Machine (EVM)
- **Role:** Executes code in a decentralized way across all nodes.
- **Key Feature:** Enforces gas limits and memory/storage rules.
- **Auditor Note:** The EVM is the referee, making sure infinite loops, huge storage writes, or attacks don’t crash the network.
- **Analogy:** Like a schoolteacher who gives every student the same assignment and checks everyone’s work identically.