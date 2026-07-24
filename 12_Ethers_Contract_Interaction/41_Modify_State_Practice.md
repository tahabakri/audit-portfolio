# 41 — Modify Contract State Practice

## What I Did
- Added a reset() function to my Constructor contract
- Wrote the test myself with guidance
- Learned "1337" is just internet slang (leet), not technical

## What I Think I Understand Now
- Constructor sets starting values at deployment
- Functions can be added anytime to modify state
- Writing small additions to existing code is easier
  than writing everything from scratch

## Security Thoughts
- reset() has NO access control - anyone can call it
- Just like increment() before - missing owner checks

## What Confused Me
- Felt overwhelmed writing code from scratch today
- Broke through by adding ONE small piece at a time instead

## Questions I Still Have
- Revised reset() - confirmed understanding:
  - Takes no parameters (empty parentheses)
  - Simply sets x = 0 whenever called
  - No matter previous value, always resets to 0