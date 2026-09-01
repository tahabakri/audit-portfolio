# 69 — Contract Puzzles (ChainShot)

## Puzzle 1 - Game1.sol
- Contract has unlock() and win() functions
- win() requires unlocked == true before setting isWon = true
- SOLUTION: call unlock() BEFORE calling win() in the test file
- Key lesson: analyzing require() conditions reveals the EXACT
  sequence of calls needed to reach a desired state

## What I Learned
- Reading a contract's require() statements tells you EXACTLY
  what conditions must be TRUE before a function succeeds
- This is EXACTLY how auditors find exploit paths - trace
  backward from the GOAL to find what STEPS are needed

  ## What I Learned (continued)
- In REAL audits, there's NO given test file - you WRITE
  your OWN test/exploit from scratch
- This puzzle format is TRAINING WHEELS for the CORE skill:
  1. Read contract's require() conditions
  2. Trace BACKWARD: what sequence of calls satisfies them?
  3. Write code executing that sequence
- Real world: "prove whether X vulnerability exists" instead
  of "modify this given test to win"