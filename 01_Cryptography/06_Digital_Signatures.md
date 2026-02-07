# Logic: Digital Signatures (ECDSA)

## The Goal
I want to prove I sent a message without revealing my Private Key.

## The 3-Step Process (Code Logic)

1.  **Hash the Message**
    *   *Code:* `hashMessage(msg)`
    *   *Why:* We sign the "Fingerprint," not the whole file. It's faster.

2.  **Sign the Hash**
    *   *Code:* `secp.sign(hash, privateKey)`
    *   *What it does:* Uses mathematical magic to combine the Hash + Private Key into a "Signature."

3.  **The Recovery Bit**
    *   *Code:* `{ recovered: true }`
    *   *Why:* This adds a tiny hint (0 or 1) to the signature.
    *   *The Magic:* It allows anyone to mathematically EXTRACT my Public Key from the signature later.

## Auditor Note
If I see code that uses `secp.sign` WITHOUT `{ recovered: true }`, it might be a bug. The receiver won't know who sent it!

Signing proves intent and identity because only the private key can produce a signature that recovers to a specific public key.

## Why recoveryBit exists

Because two public keys can match one signature mathematically. The recovery bit (0 or 1) tells us which one is correct.

## Hash First: Never sign raw messages.

    *   *Why:* We sign the "Fingerprint," not the whole file. It's faster.

## Sign Intentionally: The signature proves identity + intent.

    *   *Why:* Only the private key can produce a signature that recovers to a specific public key.

## Recovery Bit: Needed to recover the public key without sharing private key.

    *   *Why:* Needed to recover the public key without sharing private key.

## Public Key Verification: Confirms that the signer is the owner of the private key.

    *   *Why:* Confirms that the signer is the owner of the private key.    