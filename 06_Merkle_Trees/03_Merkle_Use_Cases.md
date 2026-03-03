# Merkle Trees: Real-World Use Cases

## 1. Simple Payment Verification (SPV)
- Allows "Light Clients" (like mobile wallets) to verify transactions.
- The phone only stores the **Block Headers** (which contain the Merkle Root).
- It doesn't need the full 500GB blockchain.

## 2. On-Chain Efficiency (The Whitelist Example)
- Storing 10,000 addresses on Ethereum is extremely expensive.
- **Auditor Recommendation:** Use a Merkle Tree.
- **Cheaper Scenario:** Scenario [A or B?]
- **Logic:** We only store the 32-byte **Root**. The user provides the **Proof** when they want to interact with the contract.

## 3. The Prover vs. Verifier Dynamic
- **Prover (The User):** Holds the full data and the neighbor hashes. They do the "heavy lifting" to find the path.
- **Verifier (The Smart Contract):** Only does the math of the path (~10-20 hashes). 
- **Security Takeaway:** Merkle Trees move the "Work" to the user and keep the "Verification" on the blockchain. This is how we scale.