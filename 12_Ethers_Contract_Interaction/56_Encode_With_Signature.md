# 56 — Encode With Signature

## What I Did
- Used abi.encodeWithSignature() as a shortcut for manual encoding
- Passed both arguments (enemies, armed) directly in the encoding
- Contract used a NEW concept: struct - groups related data together
  struct Ambush { bool alerted; uint enemies; bool armed; }

## What I Learned
- abi.encodeWithSignature("funcName(type1,type2)", arg1, arg2)
  combines hashing AND argument encoding in ONE step
- CRITICAL RULES:
  1. Only function name, no keywords
  2. No spaces between commas: "func(uint256,bool)" not "func(uint256, bool)"
  3. Must use uint256, NOT the alias uint
- One typo in the signature string = completely different calldata

## Security Thoughts
- Signature strings are "brittle" - very easy to accidentally break
- This confirms AGAIN why the clean interface method is safer
  for anything beyond simple learning exercises

## What Confused Me
- Felt lost about WHY we needed 5 different lessons today
- Realized they were all answering ONE question:
  "how does Contract A make Contract B DO something?"
- Step by step: sending ETH to EOA -> sending ETH to contracts ->
  calling functions cleanly (interface) -> calling functions
  manually (understanding internals) -> calling with arguments
- Interface method = what I'll use 95% of the time in real work
- Manual methods exist so auditors understand what's happening
  UNDERNEATH the clean version