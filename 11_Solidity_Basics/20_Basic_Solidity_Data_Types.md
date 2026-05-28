# 20 — Basic Solidity Data Types

## What I Did
I wrote my first Solidity contract with two boolean 
state variables. Both passed the tests on Alchemy University.

## What I Learned

### Boolean
- Declared as `bool`
- Can only hold `true` or `false`
- Default value is `false`

### Public Variables
- `public` means anyone can read this variable
- Solidity automatically creates a getter function for it
- Example: `bool public a = true;`
- Anyone can call `a()` to read the value

### State Variables
- Stored permanently on the blockchain
- Changing them costs gas
- They keep their value between transactions

## Security Thoughts
- Never store sensitive data on-chain
- Even `private` variables can be read by anyone
  reading raw blockchain storage
- `private` only stops OTHER CONTRACTS from reading it
- This is called on-chain data exposure
- Public variables expose all their data to everyone

## What Confused Me

## Questions I Still Have