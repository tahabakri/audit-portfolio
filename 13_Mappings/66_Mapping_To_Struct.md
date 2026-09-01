# 66 — Mapping to Struct

## What I Did
- Built mapping(address => User) where User is a struct
- Each address stores MULTIPLE values together (balance + isActive)
- Prevented duplicate user creation with require check

## What I Learned
- mapping(address => bool) stores ONE value per address
- mapping(address => User) stores MULTIPLE values per address (a struct)
- Access struct fields with dot notation:
  users[msg.sender].balance = 100;
  users[msg.sender].isActive = true;

## Security Thoughts
- SAME vulnerability pattern from vending machine reappeared here
- require(users[msg.sender].isActive == false) prevents duplicate creation
- This confirms: this "prevent duplicate action" pattern is COMMON
  across MANY different contract types (tokens, memberships, users)

## What Confused Me
- Struggled writing function syntax from scratch (parentheses,
  semicolons, keyword placement) - genuinely hard at first
- Broke through by fixing ONE small error at a time instead
  of trying to write the whole thing perfectly on the first try

## Questions I Still Have
- How does mapping lookup actually WORK conceptually?
- Answer: like giving a CLUE (the key/address) and INSTANTLY
  getting the EXACT matching data (the value/User struct) back
- No searching required - direct lookup, like handing someone
  a specific label and getting the EXACT matching item back