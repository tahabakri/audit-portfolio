# 27 — Solidity Functions

## What I Learned

### view vs pure
- view = reads state but cannot change it
- pure = cannot read OR change state
- pure works only with its own inputs
- Both save gas compared to state-changing functions

### Function Visibility
- public = anyone can call
- external = only outside contracts and wallets
- internal = only this contract and inherited contracts
- private = only this contract

### Writing to Storage
- Functions that change state cost gas
- view and pure functions are cheaper to call
- Always minimize state changes to save gas

## Security Thoughts
- public on powerful functions = anyone can call = dangerous
- changeOwner() with no access control = critical vulnerability
- Anyone can steal contract ownership
- Always check: "Who is allowed to call this function?"
- Every powerful function needs:
  require(msg.sender == owner);
- This is called access control
- Missing access control is one of the most common vulnerabilities

## What Confused Me
- How view and pure actually stop someone from writing state
- Answer: the compiler enforces it — it refuses to compile
  if a view function tries to change state
- No trust needed — the rule is automatic

- Why four visibility levels exist
- Answer: like a building with different access levels
  public = anyone, external = outside only,
  internal = family only, private = only yourself