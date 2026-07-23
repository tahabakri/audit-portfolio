# 34 — Contracts with ethers.js

## What I Learned

- ABI lets ethers.js automatically create JavaScript functions
  matching the contract's Solidity functions
- public state variables get automatic getter functions
- Example: uint public value creates contract.value()
- Calling a getter returns a promise — use await or return it directly

## Security Thoughts

- Reading state (like value()) costs zero gas — completely safe
- Writing state costs gas and changes permanent data
- Auditors focus most attention on state-changing functions
- Read functions cannot cause harm by themselves
- Risk always comes from what can be WRITTEN, not read

## What Confused Me

- Why we need to translate to JavaScript
  Answer: browsers only understand JavaScript
  JavaScript is the bridge between website and blockchain
- Why public variables get automatic getter functions
  Answer: saves time — free read access without extra code

## Questions I Still Have

- What to do when a contract looks too complex?
  Answer: break it into small pieces, one function at a time
  Ask what each input/output means before moving to the next
