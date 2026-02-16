# Secure ECDSA Node: Project Notes

## 1. Project Overview
This project is a simplified "Full Stack" blockchain-like application consisting of a Client (wallet interface) and a Server (bank/ledger).

- **Goal**: Transition from a "Trust-based" system to a "Cryptographic" system where only private key owners can authorize fund movements.
- **Architecture**:
    - **Frontend (React/Vite)**: Interface for entering private keys and signing transactions.
    - **Backend (Node.js/Express)**: Manages balances and performs signature verification.

## 2. Environment Setup
To run the application, two simultaneous processes are required:

| Component | Command | Purpose |
| :--- | :--- | :--- |
| **Server** | `node index` or `nodemon index` | Manages the balance database. |
| **Client** | `npm run dev` | Serves the UI on `localhost:5173`. |

*Note: `nodemon` is preferred for development to enable automatic server restarts.*

## 3. Vulnerability Analysis
- **The Bug**: The server trusted the `sender` address provided in the request body without proof of ownership.
- **The Exploit**: An attacker could impersonate any funded address by simply providing its public address.
- **Root Cause**: Lack of authentication; the system assumed knowing an address was equivalent to owning it.

## 4. Key Generation Logic
The `generate.js` script creates cryptographic identities using the `secp256k1` library:

```javascript
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log("Private:", toHex(privateKey));
console.log("Public (Address):", toHex(publicKey));
```

## 5. Implementation Strategy (Sign -> Recover -> Verify)

### Client Side (Sign)
The website generates a signature without exposing the private key:
1. Hash transaction details (Amount + Recipient).
2. Sign the hash with the **Private Key**.
3. Send the **Signature** and **Recovery Bit** to the server.

### Server Side (Verify)
The server acts as the validator:
1. Re-hash the incoming transaction details.
2. Use `secp.recoverPublicKey` to derive the public key from the signature.
3. Compare the **Recovered Key** against the **Claimed Sender**.

## 6. Auditor's Security Takeaways
- **Private Key Hygiene**: Typing private keys into web forms is a critical vulnerability. Production apps must use hardware wallets or browser extensions (e.g., MetaMask).
- **Hex Representation**: Libraries return `Uint8Array`. Always convert to Hexadecimal strings using `toHex` for transmission or comparison.
- **Address Formatting**: Ensure consistent handling of the `0x` prefix to prevent string comparison failures (`0xabc` !== `abc`).
```