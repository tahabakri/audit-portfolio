# 👛 Ethereum Wallets & Signing

This guide covers instantiating wallets and signing transactions using `ethers.js`.

---

## 🎯 Stage 1: Let's Make Wallets

### 1. From a Private Key
A **Private Key** is a 256-bit value used to authenticate you to the network. It's essentially your "master password" for an address.
- **Used key:** `0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d`

### 2. From a Mnemonic (Seed Phrase)
A **Mnemonic Phrase** (BIP-039) is a sequence of words representing your key.
- **Used phrase:** `plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice`

---

## ✍️ Stage 2: Signing Transactions

Signing a transaction authenticates you to the network. It proves that you, as the owner of the private key, authorized the specific movement of funds or execution of code.

### The Raw Transaction Breakdown
When a transaction is signed and encoded (RLP), it looks like a long hexadecimal string.

| Bytes | Meaning | Value in Example |
| :--- | :--- | :--- |
| `0x` | Hex Prefix | - |
| `f86b` | RLP List Header | 107 bytes coming up |
| `80` | Nonce | 0 |
| `3b9aca00` | Gas Price | 1 Gwei |
| `5208` | Gas Limit | 21,000 |
| `dd0d...de92` | To Address | Recipient |
| `0de...000` | Value | 1 Ether |
| `80` | Data | None (Transfer) |
| `1b` | v | Recovery ID / Chain ID |
| `f503...e9b` | r | Sig coordinate |
| `2711...7a4` | s | Sig coordinate |

---

## 🛠️ Implementation

### Instantiation
```javascript
const wallet1 = new Wallet(privateKey);
const wallet2 = Wallet.fromMnemonic(phrase);
```

### Signing
```javascript
const signaturePromise = wallet1.signTransaction({
    value: utils.parseEther('1'),
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
    gasLimit: 21000,
});
```

## 🔗 Stage 3: Connect & Broadcast

Signing a transaction is only half the battle. To actually modify the blockchain, the transaction must be **broadcasted** to the network through a node.

### What is a Provider?
A **Provider** is an abstraction of a connection to the Ethereum network. It allows you to:
*   Read state (balances, latest block).
*   Broadcast signed transactions.
*   Query smart contract logic.

In this stage, we connect to a local **Ganache** instance for testing. When moving to production, you would simply point the provider to a mainnet node (like **Alchemy**).

| Feature | Description |
| :--- | :--- |
| **`Web3Provider`** | Wraps a standard EIP-1193 provider (like Ganache or MetaMask). |
| **`sendTransaction`** | Takes a raw signed transaction (hex) and pushes it to the mempool. |
| **`waitForTransaction`** | Awaits the block confirmation (mining) of a transaction. |

---

## 🛠️ Implementation

### 1. The Provider Setup
```javascript
const provider = new providers.Web3Provider(ganacheProvider);
```

### 2. Broadcasting logic
```javascript
async function sendEther({ value, to }) {
    const rawTx = await wallet.signTransaction({ value, to, ... });
    return provider.sendTransaction(rawTx);
}
```

---

## 🧪 Testing

Run the full suite:
```bash
# Test All Stages
npx mocha 09_Ethers_JS_Wallets/test/
```

### Flow Verification:
1.  **Wallet** signs the work order locally.
2.  **Provider** transmits the signed package to Ganache.
3.  **Network** includes the transaction in a block (mines it).
4.  **Balance** moves from `msg.sender` to the recipient.

