# 37 — Signers and .connect()

## What I Learned
- A Signer represents a wallet (EOA) that can sign transactions
- contract.connect(signer) switches WHICH wallet is calling a function
- msg.sender changes based on which signer is connected
- Useful for testing different user permissions

## Security Thoughts
- require(msg.sender == owner) is the COMMON pattern
  Used to protect powerful/dangerous functions
- require(msg.sender != owner) is UNUSUAL
  Only used here as a teaching example
- Real contracts almost always restrict access WITH == owner
  not exclude the owner with != owner
- Auditor always checks: which functions need == owner protection?

## What Confused Me
- Why != owner instead of == owner in this lesson
- Answer: it's an artificial teaching trick to force practice
  with .connect(signer) — not how real contracts normally work

## Questions I Still Have
- When is .connect() used in real life?
- Answer: testing scenarios with MULTIPLE users
  Example: voting contracts where many different people
  need to interact — each .connect() simulates a different voter