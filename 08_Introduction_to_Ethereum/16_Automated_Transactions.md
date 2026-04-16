# Logic: wallet.sendTransaction (The All-in-One)

## 1. The Setup
To use automated features, the Wallet must be "connected" to a Provider:
`const wallet = new Wallet(PRIVATE_KEY, provider);`

## 2. The Benefits
The `sendTransaction` method performs these steps automatically:
1. **Populate:** It calls the node to find the current Nonce, Gas Price, and Chain ID.
2. **Sign:** It uses the Private Key to sign the transaction internally.
3. **Broadcast:** It sends the signed data to the network.

## 3. Why we use it
- Prevents `TXRejectedError` (Wrong Nonce).
- Simplifies code from 2-3 steps down to 1.

## 4. Security Note (Auditor's Reflection)
While convenient, automation hides details. As an auditor, I must remember that underneath this one line of code, the same 4-step JSON-RPC process (from Lesson 10) is still happening.