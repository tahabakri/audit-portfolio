# Logic: Handling Multiple Transactions (Donation Script)

## 1. The Setup
- I used `new Wallet(key, provider)` to create a signer that is aware of the network.

## 2. The Loop
- When dealing with an array of addresses, I use a `for` loop to iterate through them.

## 3. The Security Rule: Await
- **Concept:** Every transaction needs a unique Nonce.
- **The Bug:** If I send transactions without `await`, they all try to use the same Nonce and fail.
- **The Fix:** I used `await wallet.sendTransaction` inside the loop. This forces the code to wait for "Transaction #1" to be confirmed (incrementing the Nonce) before starting "Transaction #2."

## 4. Auditor Takeaway
As an auditor, I check if loops that send money are "Gas Efficient." Sending money to 100 people in a single loop might hit the **Block Gas Limit**. For small lists (like 3 charities), this logic is perfect.