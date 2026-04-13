# Logic: Ethereum Account Models

## 1. Externally Owned Accounts (EOA)
- **Controlled by:** A human with a Private Key.
- **Properties:** Has a **Balance** and a **Nonce**.
- **Capabilities:** Can start transactions.

## 2. Contract Accounts (Smart Contracts)
- **Controlled by:** Its own internal code (Logic).
- **Properties:** Has a **Balance**, a **Nonce**, and **Storage**.
- **Capabilities:** CANNOT start a transaction by itself. It can only "respond" when a human (EOA) calls it.

## 3. The Nonce (Security Shield)
- **In an EOA:** It is a counter of how many transactions the user has sent.
- **Auditor Note:** The Nonce prevents **Replay Attacks**. If a transaction has Nonce 5, the network will never accept another Nonce 5 from that same account.

## 4. What to think
"In Bitcoin, my balance was just a pile of unspent coins (UTXOs). In Ethereum, the blockchain acts like a real bank database. It has a specific 'row' for my address that stores my current balance and my current Nonce. This makes it much easier to write code, but I have to trust the Nonce to protect me from hackers."

## 5. Address Derivation (The Birth Rule)
- **EOA Address:** Derived from the **Public Key** (which comes from the Private Key).
- **Contract Address:** Derived from the **Creator's Address + Creator's Nonce**.
- **Auditor Note:** Since addresses are predictable, I must be aware of "Address Squatting" where an attacker tries to claim a specific address before the honest developer can.

## 6. Overview

There are two types of accounts in Ethereum:

- Externally Owned Accounts (EOAs)
- Contract Accounts

Both are part of Ethereum’s global state, but they behave very differently.

---

## 6. Externally Owned Accounts (EOA)

EOAs are accounts controlled by a private key (like MetaMask).

### Key properties:
- Controlled by a private key
- Can send transactions
- Have a balance (ETH)
- Have a nonce (transaction counter)

### Important:
EOAs are similar to Bitcoin wallets, but with differences:
- Ethereum addresses are 40-character hexadecimal strings
- Ethereum uses account-based model (not UTXOs)

---

## 7. Ethereum Account Model vs Bitcoin UTXO Model

### Bitcoin:
- Uses UTXOs (Unspent Transaction Outputs)
- Balance is calculated from multiple outputs

### Ethereum:
- Uses account-based model
- Each account directly stores balance
- Easier to track state

---

## 8. Nonce

Each EOA has a nonce:
- Represents number of transactions sent
- Increments after each transaction
- Prevents replay attacks

### Example:
If nonce = 0:
- first transaction uses nonce 0
- next transaction must use nonce 1

---

## 9. Contract Accounts

Contract accounts are smart contracts deployed on Ethereum.

### Key properties:
- No private key
- Cannot initiate transactions
- Execute only when called
- Have:
  - address
  - balance
  - storage (state)

### Behavior:
- Run code when triggered by a transaction
- Can interact with other contracts
- Cannot act independently

---

## 10. Key Difference: EOA vs Contract

| Feature | EOA | Contract Account |
|--------|-----|------------------|
| Private key | Yes | No |
| Can send transactions | Yes | No |
| Has code | No | Yes |
| Controlled by | User | Logic + transactions |

---

## 11. Security Insight

- EOAs control execution via signatures
- Contracts execute logic based on input
- Attacks happen when EOAs send crafted transactions that trigger vulnerable logic

---

## 12. Key Takeaway

- EOAs = initiators (users)
- Contracts = programmable logic
- Blockchain = execution environment

Nothing happens unless an EOA triggers it.