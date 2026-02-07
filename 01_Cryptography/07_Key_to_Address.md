# Ethereum Cryptography — Audit Learning Notes

> **Purpose**: These notes document the *thinking process*, *questions*, and *corrected understanding* behind recovering a public key from a signature and deriving an Ethereum address. Written in an audit‑friendly way.

---

## Section 1 — Recovering the Public Key

### Question 1: What does `recoverKey` need to do?

**My initial answer (raw):**

> recoverKey should take the message, hash it, then use hashed key with signature and recovery bit to get the public key

**Corrected understanding:**

* The original message **must be hashed first** (Ethereum signs hashes, not raw text)
* The hash, signature, and recovery bit are sufficient to **reconstruct the public key**
* This allows blockchain nodes to know **who signed a transaction** without sending the public key directly

**Audit note:**
Public key recovery is critical because Ethereum transactions do **not** include the public key explicitly — it is inferred from the signature.

---

### Question 2: What type of value is the recovered public key?

**My initial answer (raw):**

> i mean it will gives hash arrayu

**Corrected understanding:**

* The recovered public key is **NOT a hash**
* It is a **Uint8Array of bytes**
* Length is typically **65 bytes** for an uncompressed key

**Structure:**

```
[ 0x04 | X (32 bytes) | Y (32 bytes) ]
```

**Audit note:**
Confusing public keys with hashes is a common beginner mistake and can lead to incorrect address derivation.

---

### Question 3: What is the recovery bit?

**My initial answer (raw):**

> im dont know..i guess recovery bit an disgnture

**Corrected understanding:**

* The recovery bit is **not part of the signature itself**
* It tells the algorithm **which of the possible public keys** is the correct one
* Elliptic curve math allows multiple possible keys — the recovery bit selects the right one

**Audit note:**
Missing or misusing the recovery bit makes public key recovery impossible.

---

## Section 2 — Public Key → Ethereum Address

### Question 4: What does `.slice(1)` do to a byte array?

**My initial answer (raw):**

> i think we ignore the first byte becuse i dnt know ..after look i think its becuse describe the format not identity

**Corrected understanding:**

* `.slice(1)` removes the **first byte only**
* The first byte (`0x04`) indicates the **format of the public key** (uncompressed)
* This byte is **metadata**, not part of the elliptic curve point

**Audit note:**
Including the format byte in hashing results in an invalid Ethereum address.

---

### Question 5: Why do we ignore the first byte of the public key?

**My initial answer (raw):**

> because describe the formt not ididnty

**Corrected understanding:**

* Ethereum addresses are derived from the **X and Y coordinates only**
* The format byte does **not represent identity or cryptographic material**
* Ethereum explicitly specifies hashing **without** the prefix byte

**Audit note:**
This step is mandated by the Ethereum yellow paper and client implementations.

---

### Question 6: Why do we hash the public key?

**Corrected understanding:**

* Hashing shortens the public key into a fixed‑size fingerprint
* Prevents exposing full elliptic curve data in addresses
* Provides collision resistance

---

### Question 7: Why do we take the *last* 20 bytes?

**Corrected understanding:**

* Keccak‑256 outputs 32 bytes
* Ethereum addresses are defined as the **right‑most 20 bytes**
* This is a protocol rule, not an arbitrary choice

**Audit note:**
Taking the first 20 bytes instead of the last is a critical implementation bug.

---

## Final Summary (Audit‑Ready)

* Messages are **hashed before signing**
* Public keys can be **recovered from signatures** using the recovery bit
* Ethereum addresses are **derived**, not stored
* Address derivation steps:

  1. Remove format byte (`0x04`)
  2. Keccak‑256 hash
  3. Take last 20 bytes

> Any deviation from these steps can result in **fund loss** or **signature verification failure**.

**Why this matters (auditor mindset 🚨)**

As an auditor, when you hear address derivation, you should immediately think:

❓ Are they hashing the correct bytes?

❓ Did they remove the format byte?

❓ Are they using Keccak, not SHA-256?

❓ Are they taking the last 20 bytes, not first?

❓ Are they confusing public key vs address?

**Most critical bugs happen here.**

**Address derivation is the deterministic process of converting a public key into a shorter blockchain address using hashing and truncation.**

---

**Status:** ✅ Core cryptography understanding reached
