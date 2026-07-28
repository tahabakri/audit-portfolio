# 52 — Calling Contract Addresses

## What I Learned

- Contracts can call OTHER contracts' functions directly
- Method 1 (manual): abi.encodeWithSignature("funcName(type)", args)
  - Error-prone, no compile-time safety checking
- Method 2 (clean): ContractName(address).functionName(args)
  - Compiler checks this is correct BEFORE deployment
- interface = a "menu" describing another contract's functions
  - Don't need the FULL contract code, just enough to call it
  - Real world example: interacting with USDC or other tokens
    without having their full source code

## Security Thoughts

- Manual encoding (abi.encodeWithSignature) can silently fail
  if you make a typo in the function signature string
- Direct calls and interfaces are SAFER because Solidity
  catches mistakes at compile time
- Always prefer the "clean" method when possible

## What Confused Me

- Why use interfaces at all? Why not just include the full code?
- Answer: for open-source standards like ERC20, USDC, WETH
  you DON'T need the full implementation - just the function
  signatures (the interface) to know how to call them
- Including full code of every standard token = bloated contracts
- Real auditors interact with thousands of contracts - would be
  impossible to copy-paste all source code for each

- Where does "owner" fit into contract-to-contract calls?
- Answer: real contracts COMBINE onlyOwner modifier with
  contract-to-contract calls together
