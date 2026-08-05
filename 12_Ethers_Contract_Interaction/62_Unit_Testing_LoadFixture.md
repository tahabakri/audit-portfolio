# 62 — Unit Testing with loadFixture

## What I Did
- Built FaucetV2 with proper onlyOwner protection
- Used loadFixture pattern instead of before() for tests

## What I Learned
- loadFixture takes a SNAPSHOT after first deployment
- REUSES that snapshot for every test instead of redeploying
- Much FASTER than the before() pattern I've used all day,
  especially important for LARGE projects with many tests
- expect(...).to.be.reverted = cleaner way to test failures
  than the try/catch pattern I've used before

## Security Thoughts
- selfdestruct warning appeared AGAIN - confirms my earlier
  discovery about EIP-6780 and the Cancun hardfork changes

## What Confused Me
- What "snapshot" actually meant with loadFixture
- Clarified with a video game analogy:
  - OLD way (before()): restart the game from ZERO every test
  - NEW way (loadFixture): SAVE right after setup, then LOAD
    that save file instantly for each test instead of restarting
- Loading a save file is much faster than replaying setup each time

## What Confused Me (continued)
- Compared loadFixture to Git commits - similar "save state" idea
- Key difference: Git saves CODE permanently, loadFixture saves
  BLOCKCHAIN STATE temporarily (just for the test run duration)
- Better analogy: like a "System Restore Point" for the
  ENTIRE blockchain state, not just code files

  ## Full Test Suite Built
- Tested owner is set correctly at deployment
- Tested withdraw() rejects amounts over 0.1 ETH
- Tested withdrawAll() rejects non-owner callers
- Tested destroyFaucet() rejects non-owner callers
- All 4 tests passing - confirms onlyOwner protection works correctly

## Security Thoughts
- This FaucetV2 fixes the vulnerability from the ORIGINAL
  Faucet.sol built earlier (unlimited withdrawals with no owner check)
- Now withdrawAll/destroyFaucet require onlyOwner - real fix applied