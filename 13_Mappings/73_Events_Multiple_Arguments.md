# 73 — Events: Multiple Arguments (Transfer)

## What I Did

- Added Transfer event with TWO address arguments
- Built transfer() function with onlyOwner-style access control
- Verified event emits CORRECT original owner and new owner

## What I Learned

- Events can take multiple arguments, just like functions
- Argument NAMES are optional - just for developer convenience
  Order MATTERS more than names for verification
- Pattern: check owner -> save old owner -> update owner -> emit event

## Security Thoughts

- Second test proves: after transfer, the ORIGINAL owner
  can NO LONGER call transfer() again (ownership properly moved)
- This mirrors REAL NFT (ERC-721) ownership transfer logic

## What Confused Me

- Whether transfer() moves data BETWEEN different contracts
  or WITHIN the same contract
- Clarified with CAR TITLE analogy:
  - Same contract = the item itself (car, collectible)
  - owner variable = WHO currently holds it
  - transfer() CHANGES who holds it, nothing is duplicated
- NOT like Bluetooth file sharing (which COPIES to both devices)
  This is a SINGLE item, ownership just MOVES from one person
  to another - old owner LOSES access completely

## Why All These Steps (Big Picture)

- Building a system that PROVES ownership permanently and
  publicly, WITHOUT needing a bank, lawyer, or government office
- Each step replaces something real-world systems handle:
  - owner variable = "who owns this right now?"
  - require(msg.sender == owner) = prevents random theft
  - owner = recipient = performs the actual transfer
  - emit Transfer(...) = permanent, public proof it happened
- Blockchain REPLACES paperwork/bureaucracy with transparent,
  automatic code that doesn't require trusting any single party

  ## markPrice Function - SOLVED

- Added ForSale event(uint price, uint timestamp)
- markPrice() with onlyOwner-style access control
- Used block.timestamp - global variable giving EXACT time
  of the current transaction

## Debugging Lesson

- Encountered "markPrice is not a function" error
- SOLVED by checking the ACTUAL contract file content -
  discovered the function was MISSING from a previous save
- Real debugging skill: verify assumptions against REALITY,
  don't just guess - CHECK the actual file state

## Simple Summary - What This Lesson Was About

- transfer() = ACTUALLY moving ownership (like signing a car title)
- markPrice() = JUST announcing "I'm selling this" (like a "For Sale"
  yard sign) - NO ownership change happens yet
- block.timestamp records WHEN the price was set - useful for
  tracking price history over time on a marketplace
- Two SEPARATE steps in a real sale: LIST first, THEN transfer
  happens later when someone actually buys
