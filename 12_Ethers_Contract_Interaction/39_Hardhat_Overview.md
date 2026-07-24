# 39 — Hardhat Overview

## What I Learned

- Hardhat = development environment for Solidity
- Key folders: /contracts, /test, /scripts, /artifacts
- hardhat.config.js = most important file, check first for bugs
- Compiling creates /artifacts automatically (ABI + bytecode)

## Security Thoughts

- Never put private keys directly in hardhat.config.js
- hardhat.config.js gets pushed to GitHub — .env does not
- .env holds secrets locally, protected by .gitignore
- Always double-check .gitignore includes .env before pushing

## What Confused Me

- Why called "Hardhat"? Just a name, no deep meaning
- Why so many steps? npx hardhat --init IS the template —
  it auto-generates everything instantly, we're not building manually

## Questions I Still Have

- Is there an alternative to Hardhat?
- Answer: YES — Foundry is the main alternative
  Foundry uses Solidity for tests (not JavaScript)
  Many professional auditors prefer Foundry for this reason
  Hardhat remains the most beginner-friendly option
