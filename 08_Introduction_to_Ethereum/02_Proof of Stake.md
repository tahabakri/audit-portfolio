# Ethereum Learning Notes (Part 2) — PoS, Gas, Loops, Finality

---

## 1. Ethereum = Global Computer
- Many nodes run the same code
- They agree on the same result (state)
- Majority decides truth (consensus)

**Auditor Note:**
If nodes disagree → network can split (fork)

---

## 2. Gas = Cost of Computation
- Every operation costs gas
- More work = more gas
- If gas runs out → transaction fails

**Key Idea:**
Gas prevents infinite loops and abuse

**Auditor Note:**
Gas is a **security mechanism**, not just a fee

---

## 3. Loops & Gas Risk
- Loop = repeating actions
- Bigger array → more iterations → more gas

### Types of loops:
- Fixed loop → safe (e.g., 10 iterations)
- Unbounded loop → dangerous (depends on user input)

**Danger:**
- Loop grows over time
- Eventually exceeds gas limit
- Function always fails → DoS

**Auditor Note:**
Always ask:
- Can this loop grow forever?
- Who controls the size?

---

## 4. Storage vs Memory
- Memory → temporary (cheap)
- Storage → permanent (very expensive)

**Critical Risk:**
- Using `SSTORE` inside loops = extremely high gas

**Auditor Note:**
Prefer memory over storage when possible

---

## 5. Denial of Service (DoS)
- Happens when a function becomes unusable

### Causes:
- Unbounded loops
- High gas usage
- Expensive storage operations

**Result:**
- Users cannot call function
- Transactions fail
- Users lose gas

---

## 6. Proof of Stake (PoS)
- Validators stake 32 ETH
- They propose and verify blocks
- Bad behavior → slashing (lose ETH)

**Security Model:**
- Honest → earn rewards
- Dishonest → lose money

**Auditor Note:**
Security comes from **economic risk**

---

## 7. Validators & Consensus
- One validator proposes block
- Others verify (attest)
- Majority agrees → block accepted

**Key Idea:**
More validators = more decentralization = more security

---

## 8. Finality (VERY IMPORTANT)

### Block Types:
- latest → can change
- safe → unlikely to change
- finalized → permanent

### Finality Definition:
Finality = confidence that block will NOT change

---

## 9. Why Finality Matters

**Risk:**
- Latest block can be reorganized (re-org)
- Transaction may disappear

**Example:**
- You receive ETH
- Act on it
- Block changes → ETH never existed

---

## 10. Finality Rule

- Before finality → NOT safe
- After finality → SAFE & permanent

**Auditor Note:**
Never trust "latest" data for critical logic

---

## 🔒 Core Security Mindset

Always ask:
- Can this fail due to gas?
- Can this loop grow forever?
- Can users get locked out?
- Is this state truly final?

---

## 🧠 What I Learned (Fill This Yourself)

## 🧠 What I Learned

### What I did:
- I learned that Ethereum now uses **Proof of Stake (PoS)** instead of Proof of Work.
- In PoS, validators stake **32 ETH** to participate.
- Validators:
  - Propose blocks
  - Verify (validate) transactions from other validators
- Blocks act like **records/receipts** of transactions.
  - Example: Bob sends 1 ETH → Bob -1, Alice +1

- I learned about **Gas**:
  - Every operation costs gas
  - More computation = more gas
  - Gas prevents abuse and infinite loops

- I learned about **Finality**:
  - **Latest** → can still change
  - **Finalized** → permanent and safe
  - Important because transactions can disappear before finality

- I learned that Ethereum security comes from:
  - Many validators
  - Economic risk (staking ETH)
  - Consensus (majority agreement)

- I started thinking like an attacker:
  - Loops can be abused
  - High gas functions can cause DoS
  - Need to analyze contracts carefully

---

### What confused me:

What confused me is about Ethereum being very expensive, but attacks can still happen. I don’t understand how someone can fully prevent attacks — even though staking and gas costs are high, attacks may still occur.  

Also, I am confused about loops. Loops seem to have many different types of work. There are loops and arrays, but I don’t fully understand the difference.  

For example, looping through users or blocks — I am not sure exactly what loops do in these cases. I just don’t know.

---

### What I think is happening:
- Ethereum is like one global computer made of many nodes
- All nodes run the same code and agree on results
- Transactions update balances stored in accounts
- Blocks store the history of these changes
- Gas limits how much computation can happen
- Finality ensures when something becomes permanent