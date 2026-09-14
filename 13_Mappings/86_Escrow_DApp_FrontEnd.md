# 86 — Escrow DApp Frontend

## What I Did
- Cloned and ran the full escrow-hardhat React app
- Started local Hardhat node, compiled contract, ran frontend
- Connected MetaMask to local network (Chain ID 31337)
- Deployed an Escrow contract through the UI
- Experienced access control FAILING when wrong account tried approve()
- Successfully approved after switching to the correct arbiter account

## What I Learned
- Real experience of msg.sender-based access control working
  in an ACTUAL frontend with a REAL wallet, not just tests
- Compiling with npx hardhat compile generates the ABI+bytecode
  artifact the React app needs to deploy/interact with contracts
- Switching accounts in MetaMask changes WHO msg.sender is for
  the next transaction

## Security Thoughts
- This proves the "locked funds" concept is real in practice:
  if NOBODY has the arbiter's private key, this contract's
  funds would be stuck FOREVER
- Real world lesson: access control isn't theoretical - it
  directly determines who CAN and CANNOT move real funds