# Week 1 Retrospective: Cryptographic Foundations

## 🛡️ The Auditor's Perspective
This week shifted my mindset from "How do I build an app?" to "How do I ensure this system cannot be cheated?" I learned that Blockchain security is not magic; it is a combination of three mathematical pillars.

---

## 1. Hashing: The Tamper-Evident Seal
Hashing is the "immutability engine" of the blockchain.
*   **Properties I Mastered:** Determinism, Pseudorandomness, One-way, and Collision-resistance.
*   **Auditor Takeaway:** I use hashes to detect if a single bit of data has changed. If the `previousHash` in Block B doesn't match the actual hash of Block A, the "Chain of Trust" is broken.
*   **Security Lesson:** The **Avalanche Effect** ensures that even a tiny change (like changing a "0" to a "1" in a transaction) results in a completely different fingerprint.

## 2. ECDSA: Identity without Exposure
I learned that you can prove who you are without ever showing your secret.
*   **The Signature Handshake:** 
    1. **Sign:** Use Private Key + Message Hash.
    2. **Recover:** The math extracts the Public Key from the signature.
    3. **Verify:** Check if the recovered key matches the claimed sender.
*   **Auditor Takeaway:** **Never trust a `sender` field.** Always verify the digital signature. If the server doesn't check the signature, anyone can move anyone's funds.
*   **Risk Note:** Private keys are the "Ultimate Pen." If a key is leaked or hardcoded in a script, the account is compromised forever.

## 3. Consensus: The Economic Barrier
I explored how a network of strangers can agree on the truth.
*   **Proof of Work:** Miners must prove they spent energy (electricity) to find a specific hash with leading zeros.
*   **Auditor Takeaway:** High difficulty prevents **Re-orgs** and **Double Spends**. To change history, a hacker must have 51% of the world's computing power to re-mine the entire chain faster than the honest nodes.
*   **Security Lesson:** "Confirmations" matter. The deeper a block is in the chain, the more energy it would cost to rewrite it.

---

## 🏗️ Project Milestone: Secured ECDSA Node
I audited a vulnerable "Centralized Bank" app and fixed it by:
1. Adding a private key input to the client.
2. Hashing and signing the transaction details before sending.
3. Implementing `recoverPublicKey` on the server to verify the signer's identity.

**Status:** Week 1 Complete. Foundations of Trust established.