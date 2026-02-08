# Advanced Cryptography – Auditor Notes

## 1. Why secp256k1? (The Backdoor Theory)
* **Context:** Most encryption curves have "random" parameters chosen by government agencies (like NIST).
* **Risk:** A government could hide a mathematical "backdoor" in those random numbers to spy on encrypted data.
* **Solution:** Bitcoin and Ethereum use `secp256k1`. Its parameters are "predictable" and mathematical, making it highly unlikely to contain a hidden backdoor.

## 2. Address Formats (UX Security)
* **Bitcoin (Base58):** Bitcoin addresses remove characters that look alike (like `0` vs `O`, `l` vs `1`).
    * *Security Benefit:* Reduces phishing and sending money to the wrong person due to a typo.
* **Ethereum (Hex):** Uses the last 20 bytes of the Public Key hash.
    * *Trade-off:* It is simpler to code, but harder for humans to read.

## 3. Diffie-Hellman (The Handshake)
* **Concept:** Allows two strangers to generate a shared secret password over an unsecure network without ever sending the password itself.
* **Use Case:** This is how HTTPS works. It's why I can safely send my credit card to Amazon without a hacker seeing it.

## 4. RSA (The Old Guard)
* **Concept:** The classic public-key system based on the difficulty of factoring large numbers.
* **Why it matters:** While blockchains use ECC (Elliptic Curve Cryptography) for speed, RSA is still the backbone of SSL/TLS certificates and general web security.
* **Security:** It is slower and requires much larger keys than ECC to achieve the same security level.

## 5. Hybrid Cryptosystems (The Best of Both Worlds)
* **Concept:** Using Asymmetric Crypto (like RSA/ECC) for the "Handshake" and Symmetric Crypto (like AES) for the "Data Transfer."
* **Why:** Asymmetric crypto is slow but great for proving identity. Symmetric crypto is fast but requires sharing a secret key.
* **Real-world:** When you visit a secure website, your browser and the server use Diffie-Hellman to agree on a secret key, and then they use AES to encrypt the actual data you send (like your password).

## 6. Hash Functions (The Digital Fingerprint)
* **Concept:** A one-way function that takes any input data and produces a fixed-size string of bytes (the hash).
* **Properties:**
    * **Deterministic:** Same input always produces the same output.
    * **Pre-image Resistance:** Impossible to reverse (find the input from the output).
    * **Collision Resistance:** Extremely hard to find two different inputs that produce the same output.
* **Use Case:** Used for verifying data integrity, password storage, and as a building block in digital signatures.
