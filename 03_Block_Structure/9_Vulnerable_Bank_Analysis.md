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

