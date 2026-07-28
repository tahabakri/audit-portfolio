# 51 — Function Modifiers

## What I Learned
- modifiers let you write reusable logic before/after a function
- _ is a placeholder for "run the actual function body here"
- onlyOwner modifier avoids repeating require(msg.sender == owner)
  in EVERY single function - write once, reuse everywhere
- Applied like: function setA() public onlyOwner { ... }

## Security Thoughts
- This is THE professional pattern for access control
- Same pattern used in OpenZeppelin's real "Ownable" contract
- Reduces code duplication = fewer chances for mistakes
- If you fix a bug in the modifier, it fixes ALL functions using it
- Much safer than writing require() separately in every function

## What Confused Me
- Why not just use OpenZeppelin's template?
- Answer: auditors MUST understand internals to verify
  OTHER people's code correctly - can't just trust blindly

- Why the _ symbol specifically?
- Answer: just a syntax choice by Solidity's creators,
  no deeper meaning - memorize it like any other symbol

- Why separate functions instead of one combined one?
- Answer: separate functions = easier to audit individually,
  easier to test, easier to spot bugs in ONE specific area