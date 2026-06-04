# 26 — Smart Contracts and Solidity Basics

## What I Learned

### Static vs Dynamic Typing
- Solidity = static typing = variable type is fixed forever
- JavaScript = dynamic typing = variable can change type
- Static typing catches mistakes before deployment
- Example: bool must always be true or false — never a number

### Private vs Public
- private = other contracts cannot read it
- But anyone reading raw blockchain storage can still see it
- private does not mean secret on Ethereum
- Never store sensitive data on-chain

### Compile-time vs Runtime Exceptions
- Compile-time = error caught before deployment = safe
- Runtime = error happens when users interact = dangerous
- Runtime bugs can cause real money loss
- Attackers can exploit runtime failures

## Security Thoughts
- Static typing is a security feature
  It prevents wrong data types from being stored
- Runtime exceptions are dangerous
  They happen after deployment with real money at stake
- Always test all possible inputs before deployment
- Auditors look for runtime exceptions carefully

## What Confused Me
- Solidity and JavaScript look similar but behave differently
- Solidity is stricter — types are fixed, mistakes cost money

## Questions I Still Have
- Why not use existing templates for security?
- Answer: templates exist (OpenZeppelin) but can still be
  misconfigured — understanding is still required