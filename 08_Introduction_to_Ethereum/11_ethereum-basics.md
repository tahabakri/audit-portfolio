# 🧠 Ethereum Basics (JSON-RPC + Accounts + Blocks)

## 📌 1. What is Ethereum?

Ethereum is a decentralized computer made of thousands of nodes.

It allows:
- Storing data (state)
- Sending transactions
- Running smart contracts

**As an Auditor:** Understanding that Ethereum is a state machine is vital. Every transaction is a state transition that must be validated for security.

---

## 🧱 2. What is a Block?

A block is a container that stores:
- Transactions
- Gas info
- Timestamp
- Previous block link

### Chain structure:
Block 0 → Block 1 → Block 2 → ...

**As an Auditor:** The `parentHash` link is what makes the chain immutable. If a single block is altered, the entire subsequent chain becomes invalid.

---

## 🔥 3. JSON-RPC (How we talk to Ethereum)

JSON-RPC is the communication method between:
- Your code (client)
- Ethereum node (server)

### Example request:
```js
{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}
```

**As an Auditor:** JSON-RPC is our primary tool for forensic analysis. We use it to pull historical data to reconstruct hack scenarios.

---

## 🧾 4. Important JSON-RPC Methods

### 📦 Get block number
`eth_blockNumber`

### 💰 Get balance
`eth_getBalance`
Params: `[address, "latest"]`

### 🔢 Get nonce
`eth_getTransactionCount`
Params: `[address, "latest"]`

### 📦 Get block data
`eth_getBlockByNumber`
Params: `[blockNumber, true]`

**As an Auditor:** Mastering these methods allows us to build custom security scanners and automated property-based testers.

---

## 🧠 5. Accounts in Ethereum

There are 2 types:

### 1. Externally Owned Accounts (EOA)
* Controlled by private key
* Used by users (MetaMask)

### 2. Smart Contracts
* No private key
* Controlled by code

**As an Auditor:** EOAs are the "owners" often targeted in phishing, while Smart Contracts are targeted for logic flaws.

---

## 🔢 6. Nonce

Nonce = number of transactions sent from an address.

Example:
* First transaction → nonce 0
* Second → nonce 1

**As an Auditor:** The nonce prevents **Replay Attacks**. If a nonce could be skipped or reused, an attacker could force a user to pay the same transaction twice.

---

## 💰 7. Balance

Balances are stored in **WEI** (smallest unit of ETH).
`1 ETH = 10^18 WEI`

Convert hex → number:
```js
parseInt(hexValue, 16); // Standard (risky for large numbers)
BigInt(hexValue);       // Auditor Recommendation (Zero precision loss)
```

**As an Auditor:** Always perform math in WEI or use `BigInt`. Rounding errors in decimal ETH are a common source of "drain" vulnerabilities.

---

## 🧪 8. Ganache (Testing Blockchain)

Ganache is a local private Ethereum network.

It allows:
* Testing transactions
* Mining fake blocks
* Reading balances locally

**As an Auditor:** We use Ganache (or Hardhat/Anvil) to **Fork Mainnet**. This lets us simulate an exploit against real protocols like Uniswap without spending real money.

---

## 📊 9. Batch Requests

Instead of making 10 network calls, you send one array:
`[request1, request2, request3]`

**As an Auditor:** Batching is essential when scanning thousands of blocks for "malicious bytecode" or identifying "sybil clusters" (many wallets controlled by one person).

---

## 🧠 10. Core Workflow

1. Your JS code sends JSON-RPC request.
2. Provider forwards it to Ethereum node.
3. Node executes method.
4. Response is returned.
5. You process the result.

---

## 🎯 Summary

I have learned how to:
✔ Read blockchain data via nodes.
✔ Audit balances and nonces for security.
✔ Analyze block metadata for censorship or spam.
✔ Use Batch requests for large-scale security scans.
✔ Use Ganache for safe, local exploit simulations.

**Final Idea:** Ethereum = Database + Computer. JSON-RPC = The bridge we use to audit both.
