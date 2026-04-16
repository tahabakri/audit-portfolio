# Logic: Broadcasting a Transaction

## 1. The Separation
- **Signing:** Happens on my computer (Private). No internet needed.
- **Broadcasting:** Happens over the network (Public). Requires a **Provider**.

## 2. The Command
- `provider.sendTransaction(rawTx)`
- This method takes the signed "Raw" data and pushes it to the Ethereum nodes.

## 3. Auditor Takeaway
As an auditor, I must understand that a transaction can be "Signed" but never "Sent." If a developer's code has a bug where they forget to call the broadcast function, the user will think they paid, but the blockchain will show nothing. Always check for the **Transaction Hash** to confirm broadcast.

## 4. The Mempool (The Waiting Room)
- Between **Broadcast** and **Mining**, the transaction sits in the Mempool.
- **Auditor Note:** A transaction in the mempool is NOT final. It can still be "Front-run" (someone paying more gas to go first) or it can fail if the network gets too busy.
- **Verification:** Always wait for the `receipt` of the transaction to prove it was actually included in a block.