# ECDSA & Transaction Security Notes

## 1. What is ECDSA?

- **ECDSA** = Elliptic Curve Digital Signature Algorithm
- Purpose: Prove ownership of an account **without revealing the private key**
- Key points:
  - **Private Key**: secret, never leaves client
  - **Public Key**: safe to share, used to verify signatures
  - **Signature**: proves the message was signed by the private key
- Analogy: Private key = password, public key = username, signing = logging in securely

---

## 2. Private Key & Server

**Question:** Should the private key be sent to the server?  
**Answer:** No. Never.

**Rules for server:**

1. Use public key to verify signatures
2. Never see, store, or generate private keys
3. Should not generate signatures for users
4. Only verify and update server state

**Reasoning:**  
The server is **not trusted with secrets**; security relies on the private key staying with the client.

---

## 3. Replay Attack & Nonce

- **Problem:** If a valid transaction is sent again (copied by attacker), server might accept it.
- **Solution:** Include a **nonce** in the signed message.

**Nonce:**

- A number that increases **per account per transaction**
- Prevents replay attacks
- Stored on the server (source of truth)
- Also sent to client so the client can sign it correctly

**Why include nonce in the signed message?**

- Prevents tampering: changing nonce after signing invalidates the signature
- Ensures each transaction is **unique**

**Order of operations:**

1. Client requests current nonce from server
2. Client creates transaction including:
   - amount
   - recipient
   - nonce
3. Client signs transaction with private key
4. Server verifies:
   - Signature
   - Nonce matches expected
   - Balance sufficient
5. Server updates balance
6. Server increments nonce

---

## 4. Security Mindset

- **Source of truth:** Server
  - Stores balances and nonces
  - Enforces rules
- **Signature** proves ownership; **nonce + state** prevents replay
- Verification must happen **before incrementing nonce**:
  - If increment happens first, invalid transactions can corrupt server state
- Replay attacks fail because:
  - Nonce has already been incremented after first transaction
  - Old transaction nonce does not match expected server nonce

---

## 5. Key Rules to Remember

1. Private key stays with the client. Never send it.
2. Signature must include all critical fields (amount, recipient, nonce).
3. Server is the authority for balances and nonces.
4. Always verify signature and nonce **before updating server state**.
5. Increment nonce **after successful transaction only**.
6. Replay attacks are prevented by combining **signature + nonce + server state**.

---

## 6. Example Transaction Flow

```text
Client:
- prepares transaction (amount, recipient, nonce)
- signs transaction with private key
- sends message + signature + public key to server

Server:
- verifies signature
- checks nonce against stored value
- checks balance
- updates balance
- increments nonce
```

- Old transactions with old nonce → rejected
- Tampered transactions → signature invalid → rejected
- Only new valid transaction with correct nonce → accepted

---

## 7. Takeaways

- ECDSA ensures only the owner can authorize transactions.
- Nonce + server state ensures transactions cannot be replayed.
- Verification order and careful state updates are critical for security.
- Security = **cryptography + state management**

---

**End of Notes**
