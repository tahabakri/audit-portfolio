# Audit Report: Vulnerable ECDSA Node

## 1. The Vulnerability: Lack of Authentication
The server allows any user to move funds from any address simply by knowing the public address string.

## 2. The Exploit
1. I entered `0x1` as my address.
2. I successfully transferred 50 units to `0x2`.
3. **The Problem:** I never provided a Private Key or a Signature.

## 3. The Security Goal
We must change the code so that the server requires a **Digital Signature** before it moves any money.

## 4. Question for the Mentor
Wait, if I use my Private Key to sign, do I have to send my Private Key to the server?

**My Answer:** 
NO. I never send my Private Key. I only send the **Digital Signature**. 

**Security Note:** 
A signature proves I authorized a specific message. Even if a hacker intercepts the signature, they cannot find my Private Key. However, they might try to "Replay" the signature. This is why we need a **Nonce** to make sure each signature is only used once.

## 5. The Fix   
    1.  The server should use my **Public Key** to verify my signature.
    2.  The server should never see my **Private Key**.
    3.  The server should never store my **Private Key**.

## 6. The Fix: Implementing Asymmetric Authentication
I successfully secured the application by implementing an ECDSA signature flow.

### Final Technical Workflow:
1. **Client Side:** 
   - User enters a Private Key.
   - App hashes the transaction data (amount + recipient).
   - App signs the hash using `secp.sign(hash, privateKey, { recovered: true })`.
   - App sends the `signature` and `recoveryBit` to the server.

2. **Server Side:**
   - Server re-hashes the transaction data.
   - Server uses `secp.recoverPublicKey(hash, signature, recoveryBit)` to extract the signer's identity.
   - Server compares the `recoveredAddress` to the `sender`.
   - If they match, the transaction is processed.

## 7. Residual Risk (Auditor's Note)
Even though the server is now secure, the **Private Key** is still handled in a browser input field. In a real-world scenario, this is a risk because:
1. Malicious browser extensions could steal the key.
2. The user might accidentally "Paste" the key into a public place.
**Solution:** In production, we should use a "Provider" like MetaMask so the website never touches the Private Key directly.