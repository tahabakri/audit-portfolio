# 33 — Smart Contract Communication

## What I Learned

- Compiling a contract produces ABI and Bytecode
- ABI = translator/menu — tells apps how to call functions
- Bytecode = machine code that runs on the EVM
- To interact with a contract you need:
  1. Contract address
  2. ABI
  3. Wallet (if sending a transaction)

## Security Thoughts

- Using the wrong ABI can cause wrong function calls
- Scammers can trick users with fake ABIs or fake addresses
- Always verify the ABI matches the real deployed contract
- Contract address is like a phone number — picks the exact contract
- Auditor question: "Is this ABI verified against the real contract?"

## What Confused Me

- How ABI and Bytecode work together in real life
- ATM Analogy:
  - Bytecode = the ATM machine itself, already built and working
  - ABI = the buttons/screen instructions telling you what you can do
  - Address = which specific ATM you are standing at
- Without ABI you cannot properly "talk" to the bytecode
  even though the bytecode is fully functional

## Questions I Still Have

- Why not combine ABI and Bytecode into one?
- Answer: they serve different audiences
- Bytecode = for the EVM, optimized to be small and cheap
- ABI = for humans/apps, needs readable structure
- Combining them would make on-chain storage bigger and more expensives
- Blockchain storage is expensive — bytecode only stores the minimum

ABI is only needed for applications on top of the blockchain.

On-chain you only need the bytecode.
