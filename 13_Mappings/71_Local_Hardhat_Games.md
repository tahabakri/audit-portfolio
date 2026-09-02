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