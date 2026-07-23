# 35 — Transactions with ethers.js

## What I Learned

- Reading state = free, no gas, no blockchain change
- Writing state = costs gas, real blockchain change
- ethers.js automatically creates functions from the ABI
- Calling a write function returns a transaction promise

## Security Thoughts

- external/public visibility does NOT mean "safe"
- It only means "callable from outside"
- modify() with no checks means ANYONE can change value
- This is a critical vulnerability: missing access control
- Fix: add require(msg.sender == owner) inside the function
- Visibility keywords control WHO CAN SEE the function
- Access control (require checks) control WHO SHOULD BE ALLOWED

## What Confused Me

- Why not make everything private for safety
- Answer: contracts need to be usable — private means
  nobody outside can ever call the function
- Real contracts like Uniswap need public functions
  so millions of users can interact with them

## Questions I Still Have

- What is the reason to use external in the first place?
- Answer: external lets outside users/wallets interact
  with the contract at all — without it the contract
  would be completely unusable by anyone
- The real security comes from ADDING access control
  on top of external, not avoiding external entirely
