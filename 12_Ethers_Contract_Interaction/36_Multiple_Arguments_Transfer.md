# 36 — Multiple Arguments and Transfer

## What I Learned
- Solidity functions accept multiple arguments just like JavaScript
- mapping(address => uint) works like a dictionary/lookup table
- Each address can have its own stored value
- Example: balances[someAddress] = 1000

## The Transfer Pattern
- require() checks conditions BEFORE making changes
- This is called "Checks, Effects, Interactions" pattern
- Always verify first, then update state
- This defensive pattern protects against many attack types

## Security Thoughts
- Order of operations matters in smart contracts
- Checks should always come first
- This becomes critical later with reentrancy attacks
- Auditor question: "Are checks done before state changes?"

## What Confused Me
- Checks/Effects/Interactions pattern
  Answer: Check conditions first (like store checking payment),
  then update records (effects), then interact with outside world
- Why not use passwords
  Answer: wallet private key signature IS the password
  msg.sender automatically proves who you are

## Questions I Still Have
- Can transfer be called multiple times?
- Answer: yes, anytime, as long as you have enough balance
  Each call checks your CURRENT balance fresh