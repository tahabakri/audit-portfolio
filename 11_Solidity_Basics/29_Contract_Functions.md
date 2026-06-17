# 29 — Contract Functions

## What I Learned
- Functions can be called anytime after deployment
- Constructor runs once — functions run many times
- external = only outside callers = cheaper gas
- public = anyone inside or outside = more gas
- x++ is shorthand for x = x + 1

## Security Thoughts
- increment() has no access control — anyone can call it
- increment() has no limit — can be called forever
- If x controls something important this is dangerous
- Fix 1: add require(msg.sender == owner)
- Fix 2: add require(x < someLimit)
- Always ask: who can call this and how many times?

## What Confused Me
- external means anyone outside can call it
  Fix: add require(msg.sender == owner) for protection
- No limit means function can be called forever
  Fix: add require(x < someLimit) to cap it

## Questions I Still Have
- Why constructor and function look different
  Answer: different purposes need different syntax
  Constructor = runs once at birth, no name needed
  Function = runs on demand, needs name and visibility