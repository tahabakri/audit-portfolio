# Ethereum Learning Notes (Part 3) — Gas & EIP-1559

---

## 1. Gas vs Gwei

- **Gas** = amount of computation (work)
- **Gwei** = price per unit of gas

**Formula:**
Total Cost = Gas Used × Gas Price (Gwei)

**Analogy:**
- Gas = distance
- Gwei = price per km

---

## 2. Why Gas Exists

- Prevents spam and abuse
- Prevents infinite loops
- Forces users to pay for computation

**Auditor Note:**
Gas is a **security mechanism**, not just a fee

---

## 3. EIP-1559 (New Gas System)

Introduced:
- **Base Fee**
- **Tip (Priority Fee)**
- **Burn mechanism**

---

## 4. Base Fee (VERY IMPORTANT)

- Automatically adjusted every block
- Based on **demand (block usage)**

### Rules:
- Block full → Base Fee ↑
- Block empty → Base Fee ↓

**Goal:**
Keep blocks around target size (~15M gas)

---

## 5. Why Base Fee is Burned 🔥

- Prevents validators from manipulating fees
- Keeps system fair
- Reduces ETH supply over time

**Result:**
- ETH supply decreases (deflationary pressure)

---

## 6. Validator Rewards

Validators earn:
- **Tip (priority fee)**

They DO NOT receive:
- Base fee (it is burned)

---

## 7. User Payment Model

When sending transaction:
- You set **max fee**
- You only pay:
  - Base fee (burned)
  - Tip (to validator)

- Extra is refunded

---

## 8. Network Behavior

- High demand → fees increase → users wait
- Low demand → fees decrease → users return

**System is self-balancing**

---

## 9. Security Insight

- Expensive gas does NOT stop attacks
- It only makes attacks more costly

**Rule:**
If profit > cost → attacker will attack

---

## 🔒 Auditor Mindset

Always ask:
- Can this be abused despite gas cost?
- Is this function too expensive?
- Can users be priced out (DoS)?

---

## 🧠 What I Learned

### What I did:
- I learned that Ethereum gas system has **two parts**:
  - **Base Fee**
  - **Tip (priority fee)**

- The **base fee**:
  - Exists for every transaction
  - Changes based on **network demand**
  - High demand → base fee increases
  - Low demand → base fee decreases

- This helps control the network:
  - If too many people use it → it becomes expensive
  - If few people use it → it becomes cheaper

- The base fee is **burned**, not given to validators

- Validators only earn the **tip**

- This system helps reduce spam and makes attacks more expensive

---

### What confused me:
- I was confused why attacks still happen even though gas is expensive
- I learned that gas does not stop attacks, it only makes them more expensive
- If attacker profit is higher than cost, they will still attack

---

### What I think is happening:
- Ethereum adjusts gas prices automatically based on demand
- When the network is busy, prices go up to reduce usage
- When the network is quiet, prices go down to encourage usage
- This keeps the system balanced and prevents overload