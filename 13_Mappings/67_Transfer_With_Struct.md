# 67 — Transfer Amount with Struct

## What I Did
- Built transfer() function moving balance between struct-based users
- Added validation: sender active, recipient active, sufficient balance
- All 3 tests passing including edge cases (non-existent user, insufficient balance)

## What I Learned
- Accessing struct fields inside a mapping: users[address].balance
- Multiple require() checks stack together - ALL must pass
- This mirrors REAL ERC-20 token transfer logic, just simplified

## Security Thoughts
- THREE separate checks needed: sender active, recipient active, enough balance
- Missing ANY of these checks = potential vulnerability
  (e.g., without recipient check, you could send tokens to a
  "ghost" address that was never properly registered)
- This pattern (check-check-check-then-modify) matches the
  Checks-Effects-Interactions pattern learned earlier

## What Confused Me
- Why transfer happens WITHIN the same contract instead of
  between different contracts
- Clarified with a BANK analogy:
  - ONE contract = the bank
  - Each address = a separate account WITHIN that bank
  - Transfer = bank updates TWO numbers internally
    (sender goes down, recipient goes up)
  - NO actual "money" moves anywhere - just number updates
- This is EXACTLY how real tokens work (USDC, DAI) -
  everyone's balance lives in ONE shared contract

- Also got confused thinking msg.sender meant "the owner"
  Clarified: msg.sender = whoever is CALLING the function,
  could be ANY registered user, not just the contract owner

## Questions I Still Have 
-Should I also add a function to check the balance of a user?
-Should I also add a function to check if a user is active?

## My Answers to my own questions (for self-reflection)
- I should NOT add a function to check the balance of a user because the users struct is public so I can check the balance of a user by calling users[address].balance from the contract itself.
- I should NOT add a function to check if a user is active because the users struct is public so I can check if a user is active by calling users[address].isActive from the contract itself.

