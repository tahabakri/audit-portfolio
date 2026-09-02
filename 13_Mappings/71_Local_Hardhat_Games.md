# 71 — Local Hardhat Games

## Game 1 - SOLVED
- Contract: NO require conditions, no arguments needed
- Solution: just call win() directly
- Deployed using: npx hardhat run scripts/deploy.js
- Won using: npx hardhat run scripts/win.js (updated gameAddr)

## What I Learned
- npx hardhat node spins up a LOCAL blockchain (like Ganache,
  but Hardhat's own version) with 20 pre-funded test accounts
- Two terminals needed: ONE running the node, ONE for scripts
- Saw REAL JSON-RPC calls happening live (eth_sendTransaction,
  eth_getTransactionReceipt) - connecting back to Week 3 lessons
- Transaction receipt contains an "events" array showing
  EXACTLY which events fired during that transaction

## Real World Connection
- This is CLOSER to actual deployment workflow than just
  running hardhat tests - deploying to a REAL running node,
  then interacting with the deployed contract separately

  ## Game 2 - SOLVED
- Contract required: x > 0, y > 0, AND x + y == 50
- SOLUTION: 
  await game.setX(30);
  await game.setY(20);
  const tx = await game.win();
- CONFIRMED understanding of await: waits for EACH transaction
  to FULLY complete before moving to the NEXT line
- Without await, transactions might run OUT OF ORDER, causing
  win() to fail because x/y aren't set YET

  ## Game 3 - SOLVED
- Contract: uint8 y = 210 (fixed value)
- win(uint8 x) requires: x + y == 255 (inside unchecked block)
- SOLUTION: solved backward from require condition
  x + 210 = 255
  x = 255 - 210 = 45
- await game.win(45);
- Introduced unchecked{} keyword - turns OFF automatic
  overflow protection, allowing the OLD wrapping behavior
  (connects back to earlier lessons on integer overflow)

  ## Game 4 - SOLVED
- Contract: uint8 y = 210, needed sum == 10
- REAL overflow puzzle: x + 210 must WRAP AROUND to land on 10
- Math: 210 + 56 = 266, uint8 max is 255 (256 total values)
  266 - 256 = 10 ✓
- SOLUTION: game.win(56)

## Game 5 - SOLVED
- Contract used mappings for balances AND allowances
- giveMeAllowance() had NO restrictions - users can grant
  THEMSELVES unlimited allowance (REAL vulnerability pattern)
- SOLUTION:
  await game.giveMeAllowance(10000);
  await game.mint(10000);
  await game.win();

## ALL 5 GAMES COMPLETED
- Game1: no conditions, direct call
- Game2: two sequential setter calls
- Game3: backward math solving (uint8 overflow)
- Game4: overflow WRAPAROUND math
- Game5: self-granted allowance vulnerability

## Real Auditor Insight
- Game5's giveMeAllowance() is a REAL vulnerability pattern -
  users should NEVER be able to self-grant unlimited permissions
- This is the EXACT type of bug real audits catch