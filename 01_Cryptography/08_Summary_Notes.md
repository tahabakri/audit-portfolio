# Supplemental Notes — Digital Signatures & Public Key Cryptography

These notes summarize key cryptographic primitives used in blockchains, HTTPS, and secure systems, with an **auditor’s mindset**.

---

## 1. ECDSA (Elliptic Curve Digital Signature Algorithm)

### What it is

ECDSA is a digital signature algorithm based on elliptic curves.  
It is used to **prove identity and intent** without revealing private keys.

### Where it’s used

- HTTPS / TLS (web security)
- Bitcoin
- Ethereum
- Blockchain transaction signing

### What signing proves

- The signer **owns the private key**
- The signer **intended to sign this exact message**
- The message **was not altered**

### Key audit insight

- ECDSA security **depends heavily on randomness**
- Weak or reused nonces (`k`) → **private key leakage**
- Many real-world hacks happened due to bad randomness

### Resources

- Cloudflare ECDSA (practical web usage)
- Wikipedia (math-heavy but precise)
- Simplified ECDSA math articles (recommended for intuition)

---

## 2. Bitcoin Cryptography (secp256k1)

### Curve choice: secp256k1

- Used by Bitcoin and Ethereum
- Curve parameters are **non-random**
- Chosen to reduce risk of hidden backdoors

### Identity chain

```

Private Key → Public Key → Bitcoin Address

```

### Bitcoin address derivation (high-level)

1. Derive public key from private key
2. Hash public key (SHA-256 → RIPEMD-160)
3. Add network prefix
4. Add checksum
5. Encode using Base58

### Why Base58?

- Removes confusing characters:
  - `0` vs `O`
  - `I` vs `l`
- Improves human usability

### Auditor notes

- Check correct hashing order
- Verify checksum logic
- Ensure correct network prefix (mainnet vs testnet)

---

## 3. Ethereum Address Derivation (Contrast with Bitcoin)

### Key difference

Ethereum address derivation is **simpler** than Bitcoin.

### Process

1. Take the public key (uncompressed)
2. Remove the first byte (format indicator)
3. Hash remaining bytes with Keccak-256
4. Take the **last 20 bytes**

### Important insight

- Ethereum addresses **do NOT include checksums by default**
- Address ≠ Public Key
- Address can always be derived from public key

---

## 4. Diffie–Hellman Key Exchange

### What problem it solves

Allows two parties to:

- Agree on a shared secret
- Over an insecure channel
- Without ever sending the secret

### Where it’s used

- TLS / HTTPS handshakes
- Secure messaging
- Hybrid cryptosystems

### Hybrid cryptosystem model

- Asymmetric crypto → handshake
- Symmetric crypto → data transfer

### Auditor mindset

- Verify correct curve/group parameters
- Check for downgrade attacks
- Ensure ephemeral keys (ECDHE, not static DH)

---

## 5. RSA (Classic Public-Key Cryptography)

### What it is

An older public-key algorithm based on large integer factorization.

### Where it’s used

- Legacy TLS
- Certificates
- Encryption & signatures (older systems)

### Known issues

- Slower than elliptic curve crypto
- Large key sizes
- Historical concerns about potential backdoors

### Learning resources

- Wikipedia (theory)
- Cryptobook (plain English)
- Eddie Woo’s RSA math videos (excellent intuition)

---

## 6. High-Level Auditor Takeaways

### Always distinguish:

- **Private Key** → secret, signs
- **Public Key** → verifies signatures
- **Address** → identifier, derived data

### Red flags in audits 🚨

- Hardcoded private keys
- Incorrect hashing algorithms
- Missing recovery bits
- Confusing public keys with addresses
- Incorrect byte slicing
- Weak randomness

---

## One-line mental model (keep this)

> Cryptography doesn’t hide identity — it proves it mathematically.
