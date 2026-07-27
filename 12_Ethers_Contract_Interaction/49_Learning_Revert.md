# 49 — Learning Revert

## What I Learned
- Three ways to trigger REVERT: assert, require, revert
- require(condition, "message") - most common, checks preconditions
- assert - for internal errors, things that should NEVER be false
- revert - can be used with custom errors (more gas efficient)
- payable constructor can require minimum ETH deposit at deployment
- 1 ether == 1e18 wei (can write "1 ether" directly in Solidity)

## Recurring Problem - Contract Name Conflicts
- Multiple files with same contract name = "multiple artifacts" error
- FIX: always give each contract a UNIQUE name
- This is the SAME fix I've used many times before in this project

## Security Thoughts
- Gas is ALWAYS charged, even on reverted transactions
  (real computational work was done up to the failure point)
- require() protects users from bad conditions
  (like Uniswap protecting against bad trade prices)
- revert with custom errors = cheaper gas than string messages

## What Confused Me
- Why three different tools (assert, require, revert) exist?
- Answer: they serve different PURPOSES
  - require = check USER input/conditions (most common)
  - assert = check INTERNAL bugs that should NEVER happen
  - revert = flexible, custom errors, cheaper gas
- As a beginner, require() covers 95% of situations

## Questions I Still Have
- Why does "require(success)" work on the .call() function? 
- Because .call() returns a tuple (bool success, bytes data) and if success is false, require() will revert the transaction.    
