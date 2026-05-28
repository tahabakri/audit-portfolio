# 20 — Intro to Solidity

## What I Learned

### Smart Contracts
A smart contract is like a vending machine because it has 
pre-existing logic that cannot be changed. Once you put 
in the right input, it gives the expected output.
No flexibility. No negotiation.

### Constructor
The constructor runs once at the moment the smart contract 
is deployed. It sets the starting state of the contract —
like the owner address, initial values, etc.
It never runs again after deployment.

### msg.sender
msg.sender tells us who is currently sending this transaction.
It is the address calling the function right now.

### uint vs int
- uint = unsigned integer = only positive numbers (0 and above)
- int = signed integer = can be positive or negative
- uint cannot hold -50 because it has no concept of negative numbers

## Security Thoughts
- The owner variable is the most powerful address in a contract.
- Auditor questions to always ask:
  - What can the owner do that others cannot?
  - Can the owner be changed? Who can change it?
  - What happens if the owner's private key is stolen?
- This risk is called privilege escalation.
- msg.sender must always be checked before powerful functions run.
- If msg.sender is not checked — anyone can call that function.
- Never store sensitive data on-chain.
- Even `private` variables can be read by anyone 
  reading raw blockchain storage.
- `private` only prevents OTHER CONTRACTS from reading it.
- This vulnerability is called on-chain data exposure.

## What Confused Me
- How privilege escalation works if private keys are never 
  shared in the contract.
- Answer: if the owner's wallet is hacked outside the contract,
  the attacker controls that address and can pass any owner check.

## Questions I Still Have
- How much data can a constructor hold?
- Answer: no hard limit on parameters, but more complexity 
  means higher gas cost at deployment.