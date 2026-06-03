# 25 — Solidity and the EVM

## What I Learned
- Solidity is high level — humans write it
- Bytecode is low level — EVM runs it
- Compiler translates Solidity to bytecode
- EVM has no loops — uses JUMP and JUMPI instead
- Stack = temporary memory for calculations
  Works like a pile — PUSH adds, POP removes

## Security Thoughts
- Every EVM operation costs gas
- Infinite or expensive loops can drain gas
- Attacker can make contract run out of gas
- This makes the contract fail or unusable
- Called a Denial of Service (DoS) attack
- Auditors always check loops for gas efficiency

## What Confused Me
- How the stack works exactly
- How bytecode opcodes map to Solidity code

## Questions I Still Have
- What other opcodes exist in the EVM?
- How do auditors read raw bytecode?