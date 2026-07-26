# 45 — Transferring Funds (Tip Function)

## What I Learned
- Functions can be made payable to receive ETH for specific purposes
- .call{value: amount}("") forwards ETH to another address
- tip() immediately forwards received ETH to owner - no storage needed

## Security Thoughts - SOLVED The Locked Funds Problem
- receive() {} = ETH gets stuck inside contract forever
- tip() = ETH passes straight through immediately, never stored
- This is the FIX for the vulnerability found earlier in Faucet/Owner
- Auditor takeaway: forwarding funds immediately avoids
  the "locked funds" vulnerability entirely
- Pattern: always ask "does ETH stay in the contract or pass through?"

## What Confused Me
- The .call{value: x}("") syntax looks strange/unpredictable
- Answer: memorize it as a fixed pattern/recipe, not something
  to derive from logic each time:
  (bool s, ) = ADDRESS.call{ value: AMOUNT }("");
  require(s);

## Questions I Still Have
- Why does receive() even exist?
- Answer: without it, contracts CANNOT accept simple ETH transfers
  receive() = accepting basic ETH like a wallet
  tip() = a specific function with custom forwarding logic
  Both receive ETH, but serve different purposes