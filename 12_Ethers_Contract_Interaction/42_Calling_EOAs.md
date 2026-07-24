# 42 — Calling EOAs

## What I Learned
- Two account types: EOA (controlled by private key) and Smart Contract
- .call{value: amount}("") sends ETH to an address
- receive() is a special function that runs when contract gets ETH
- msg.value = amount of ETH sent with the transaction
- .call returns (bool success, bytes data)
- Empty "" string means no function is being called, just sending ETH

## Security Thoughts
- require(success) after .call ensures the WHOLE transaction fails
  if the ETH transfer fails
- This is called "all or nothing" - prevents partial payments
- Example: if author1 gets paid but author2's transfer fails,
  require() reverts EVERYTHING, undoing author1's payment too
- This protects against unfair partial states

## What Confused Me
- Forgot how require() reverting works - needed a refresher
- Remembered: require failing anywhere cancels the WHOLE transaction

## Questions I Still Have
- Why do we need EOAs in the first place?
- Answer: someone must INITIATE transactions
- Smart contracts can only REACT, they cannot start anything themselves
- EOAs (wallets) are the starting point for all blockchain activity
- Without EOAs, nothing would ever happen - the chain would be frozen