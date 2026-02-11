# Proof of Work – Learning Notes

## 1. The Problem (Consensus)
* **Context:** In a decentralized network, there is no boss (Bank) to say "Alice has $10."
* **Auditor Question:** If I have 500 computers and you have 1 computer, why does "voting" on the truth fail? (Why can't we just say "majority wins" based on IP addresses?)
* **My Answer:** [Sybil Attack Resistance....If voting was based on "IP addresses" or "Computers," I could spin up 1,000 fake computers (Sybils) and outvote you. Proof of Work solves this because I cannot fake electricity.]

## 2. The Solution (Mining)
* **Concept:** Mining is not finding gold; it is solving a math puzzle.
* **The Algorithm:**
    1. Take the Block Data (Transactions).
    2. Add a random number (Nonce).
    3. Hash it.
    4. Did the hash start with 0000...?
       * YES -> Broadcast block.
       * NO -> Change Nonce, try again.
* **Auditor Question:** Why does the network demand the hash starts with "0000"? What does that prove?
* **My Answer:** [Auditor Term: Difficulty Target...Finding a hash with many zeros is statistically rare. It proves you spent real-world resources (CPU time + Electricity). It is the "receipt" for the work.]

## 3. The Security (51% Attack)
* **Context:** To cheat (double spend), I need to mine faster than everyone else combined.
* **Auditor Question:** If I want to rewrite the last 10 blocks of Bitcoin, what physical resources do I need to buy?
* **My Answer:** [Immutability (51% Attack Cost)...To rewrite history, you have to redo all the work for those 10 blocks plus catch up to the current chain. The energy cost would be billions of dollars.]

### Mempool and Mining Process

1. **Mempool** is a **waiting area** for transactions before they are included in a block.
2. **addTransaction()** function adds transactions to the mempool (via `push()`).
3. **mine()** function:
   - Checks if mempool has transactions.
   - Starts mining if transactions are available.
   - Changes **nonce** until the **hash meets the target difficulty**.
   - Successfully mined blocks are broadcasted to the network.
