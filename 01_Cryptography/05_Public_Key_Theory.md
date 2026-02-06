# Public Key Cryptography (Asymmetric)

### 1. The History
*   **Symmetric Encryption:** Both people share the [SAME] key.
    *   *Risk:* You have to meet in person to exchange the key securely.
*   **Asymmetric Encryption (1976):** Invented by Whitfield Diffie. Uses TWO keys.
    *   One key is [PUBLIC].
    *   One key is [PRIVATE].

### 2. The Two Keys (Auditor's Mental Model)
*   **The Private Key:**
    *   Kept secret.
    *   Used to **[DECRYPT]** messages.
    *   Used to **Sign** transactions (Digital Signature).
*   **The Public Key:**
    *   Shared with the world.
    *   Used to **[ENCRYPT]** messages so only the owner can read them.
    *   Used to **Verify** that a signature is real.

### 3. The Algorithms
*   **RSA:** Based on Prime Numbers. Used in old web security.
*   **ECDSA (Elliptic Curve):** Based on curves.
    *   *Why it matters:* Bitcoin and Ethereum use **[ECDSA]**.
    *   Specifically, they use the curve named `secp256k1`.

### Public Key Cryptography – Learning Notes

#### 1. The "Meetup" Problem (Symmetric vs Asymmetric)
**Context:** The text says symmetric keys require two people to "agree on a key" beforehand.
**Auditor Question:** If I am a bank with 1 million customers, why is "Symmetric Key" cryptography a security nightmare? (Think: How many keys would the bank have to hide?)
**My Answer:** [Actually, it’s even worse! In Symmetric encryption, the bank would need a unique secret key for each customer. If they have 1 million customers, they have to protect 1 million different secret keys. That is a security nightmare]
**Why Asymmetric is better:** The bank only needs to know your Public Key (which isn't a secret). You keep the secret (Private Key). The bank stores zero secrets.

### 2. The "Bob" Experiment (Digital Signatures)
**Context:** The text says: "Upon decrypting this message [with Bob's public key], we can say beyond a shadow of a doubt that only Bob could have written it."
**Auditor Question:** If I hack Bob's computer and steal his PRIVATE key, can I impersonate Bob? Why?
**My Answer:** [Yes. The Private Key is like a "Digital Pen." If I steal it, I can sign transactions that look exactly like Bob's. The network cannot tell the difference between Bob and the Hacker.]

### 3. The Bitcoin Standard (ECDSA)
**Context:** Bitcoin uses ECDSA (secp256k1) instead of RSA.
**Auditor Question:** The text mentions "smaller key sizes." Why is a smaller key size important for a Blockchain that is stored on thousands of computers?
**My Answer:** [Blockchains store data forever on thousands of computers. Smaller keys mean less storage space and faster calculations, which makes the network more efficient.]

# Public Key Theory – Learning Notes

## 1. The "General's Problem" (Symmetric)
**Question:** The video says Generals had to meet in person to exchange keys. Why is this impossible for the Internet (Web3)?
**My Answer:** [this impossible for the internet because there are millions of people on the internet and it is impossible to meet all of them in person to exchange keys]

## 2. The "Split Key" (Asymmetric)
**Question:** Whit Diffie split the key into two parts.
* **Public Key:** Used to Encrypt (Lock) or Verify.
* **Private Key:** Used to Decrypt (Unlock) or Sign.
**Auditor Check:** Which key do I put on my Twitter bio? Which key do I delete from my computer if I think I'm hacked?
**My Answer:** [private key should be deleted from my computer if i think im hacked]

## 3. The "Wax Seal" (Authentication)
**Question:** The video says "Only Bob can decrypt the message" but also "Anyone can verify the message".
**Auditor Scenario:** If I steal Bob's PUBLIC key, can I steal his money?
**Auditor Scenario:** If I steal Bob's PRIVATE key, can I sign a transaction to send his money to me?
**My Answer:** [Yes. If I steal Bob's PRIVATE key, I can sign a transaction to send his money to me. The network cannot tell the difference between Bob and the Hacker.]