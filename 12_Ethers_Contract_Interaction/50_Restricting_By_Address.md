# 50 — Restricting by Address

## What I Did
- Built withdraw() with proper access control
- require(msg.sender == owner) blocks everyone except owner
- This SOLVES the vulnerability I identified multiple times today
  (unrestricted functions letting anyone call sensitive actions)

## What I Learned
- Custom errors: error NotItemCreator(); then revert NotItemCreator();
- This pattern restricts a function to ONE specific address (or role)
- Combines patterns I already knew: require() + owner check + .call

## Security Thoughts
- THIS is the fix for locked funds AND unauthorized access
- Real contracts almost ALWAYS need this pattern for sensitive functions
- Today I went from IDENTIFYING vulnerabilities to FIXING them

## What Confused Me
- Doubted my own ability to write code, even though I understood
  every individual piece - had to be reminded I already knew this

## Questions I Still Have
- Is require(msg.sender == owner) just "extra" security?
- Answer: NO - it's ESSENTIAL, not extra
- This is the SAME missing piece from EVERY vulnerability
  found today (increment, reset, donate/selfdestruct)
- Without it: anyone can call powerful functions
- With it: only the rightful owner can
- This is the MINIMUM baseline protection, not a bonus feature
