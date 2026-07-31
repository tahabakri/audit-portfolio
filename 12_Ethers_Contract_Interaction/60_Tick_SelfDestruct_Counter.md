# 60 — Tick Counter with SelfDestruct

## What I Did
- Built a counter that increases each time tick() is called
- After the 10th call, contract triggers selfdestruct
- Combined TWO patterns I already knew: increment counter + selfdestruct

## What I Learned
- uint public counter; declared OUTSIDE any function (state variable)
- counter++ increases it by 1 each call
- if(counter == 10) checks the condition before triggering selfdestruct
- This combines patterns from earlier lessons into ONE working contract

## Security Thoughts - Config Discovery
- hardhat.config.js was set to "shanghai" hardfork by an
  earlier auto-fix, NOT the current real Ethereum rules (Cancun)
- Shanghai rules: selfdestruct ALWAYS deletes bytecode
- Cancun (REAL current rules): selfdestruct only deletes bytecode
  if called in the SAME transaction as contract creation
- This test passed locally, but might NOT match real mainnet behavior
- IMPORTANT LESSON: always verify test environment config matches
  the ACTUAL network rules before trusting test results completely

## What Confused Me
- Had to slow down and build this in tiny separate pieces
  (variable first, then counting, then the selfdestruct check)
  instead of trying to write everything at once

