# 55 — Function Signature (Manual Encoding)

## What I Did
- Manually built calldata using keccak256 hash of "alert()"
- bytes4(keccak256("alert()")) creates the 4-byte function selector
- Used abi.encodePacked() and .call() to trigger the function manually

## What I Learned
- This is the SAME process Solidity does automatically
  when you write the "clean" method: IHero(hero).alert()
- Manual method requires EXACT function signature as a string
- Any typo here is INVISIBLE to the compiler - fails silently
  or calls the wrong function at runtime

## Security Thoughts
- This confirms why the interface method is SAFER
- Manual encoding = no compile-time protection against typos
- Real auditors need to understand THIS level to read
  raw transaction data and verify what a contract is ACTUALLY calling
- Function selectors (4 bytes) can be used to identify
  suspicious or malicious transaction calls

## What Confused Me
- this line was too much in one go, had to break it down myself
- alert() is just the function name as text
- keccak256 scrambles it into a weird code
- bytes4 just cuts the first part of that code
- signature is where we save it
- still dont fully get keccak256 but i get what it does for now
