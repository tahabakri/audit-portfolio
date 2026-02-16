# Logic: Server-Side Verification

## The Goal
Prevent a hacker from sending a fake transaction.

## The "Proof" Workflow
1. **Receive:** The server gets the Message, Signature, and Recovery Bit.
2. **Hash:** The server hashes the Message to get the fingerprint.
3. **Recover:** The server uses `recoverPublicKey(hash, signature, recoveryBit)`.
4. **Verify:** 
   - Does the Recovered Address == the Sender's Address?
   - YES -> Move the money.
   - NO -> Reject the transaction!

## Auditor Question
What happens if the hacker intercepts a valid signature and changes the `amount` from 10 to 100 before the server sees it?

**My Answer:**
Nothing! The signature proves the original message. The hacker cannot change the message without invalidating the signature. The server will reject the transaction.