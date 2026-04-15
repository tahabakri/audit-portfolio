# 👛 Let's Make Wallets

This activity focuses on instantiating Ethereum wallets using two common methods: **Private Keys** and **Mnemonic Phrases**.

---

## 🎯 Your Goal
Instantiate two Wallet instances using `ethers.js`.

### 1. From a Private Key
A **Private Key** is a 256-bit value used to authenticate you to the network. It's essentially your "master password" for an address.
- **Used key:** `0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d`

> [!CAUTION]
> **Security Warning:** Never share your private key. Anyone with access to it can steal your funds. The odds of someone guessing your key are astronomically low ($2^{160}$ distinct addresses).

### 2. From a Mnemonic (Seed Phrase)
A **Mnemonic Phrase** is a human-readable sequence of words that represents your private key (governed by BIP-039). 
- **Used phrase:** `plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice`

> [!IMPORTANT]
> Mnemonics are even more critical than a single private key because **one mnemonic can generate many private keys** across multiple chains (BIP-044).

---

## 🛠️ Implementation

In `ethers.js`, the `Wallet` class manages the key pair and provides functions for signing Transactions.

| Method | Description |
| :--- | :--- |
| `new Wallet(privateKey)` | Creates a wallet from a 256-bit hex string. |
| `Wallet.fromMnemonic(phrase)` | Creates a wallet from a seed phrase. |

---

## 🧪 Testing

To verify the addresses:
1. Ensure `mocha` and `chai` are installed.
2. Run the tests in the `test/` directory.

**Expected Addresses:**
- **Wallet 1:** `0x5409ED021D9299bf6814279A6A1411A7e866A631`
- **Wallet 2:** `0x88E9DD325BA8329dDD9825c1d24e8470b25575C1`
