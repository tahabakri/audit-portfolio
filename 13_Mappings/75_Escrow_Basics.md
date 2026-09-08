# 76 — Escrow Basics

## What I Did

- Built Escrow.sol with three public address variables:
  depositor, beneficiary, arbiter

## What I Learned

- Escrow = an agreement where funds are held until a third party
  approves the release
- Three roles:
  - depositor: pays into the escrow
  - beneficiary: receives the funds once approved
  - arbiter: the only one who can approve/release the funds
- Real world use cases: real estate deals, charity donations,
  marketplace transactions

## Security Thoughts

- The arbiter role is a single point of trust/failure - if the
  arbiter's key is compromised, funds could be released incorrectly
- Auditor question: is there any way to change the arbiter after
  deployment? If so, who can do that?

## What Confused Me

- Initially compared it to a Faucet (anyone withdraws freely)
- Correction: Escrow is DIFFERENT - only the ARBITER decides
  WHEN to release funds, based on conditions being met
- More like a real estate deal: buyer deposits, seller provides
  the good/service, arbiter verifies and releases payment

## Questions I Still Have

- Can the depositor cancel/withdraw if the arbiter never approves?
- Or is the money locked forever without arbiter action?
- Need to clarify: does money move on its own after arbiter
  approval, or does someone need to call a separate release
  function?
- In real-world escrow, who decides what "conditions met" means?

## Why All These Steps (Big Picture)

- Building a system where money moves AUTOMATICALLY based on
  rules, without needing a bank or lawyer to approve manually
- Each step builds towards that goal:
  - depositor/beneficiary/arbiter variables = WHO is involved
    in this agreement
  - escrow.sol = the rulebook that defines what can happen
  - Tests check that the rules are set up correctly before
    anyone deposits money
- Next steps will add the ACTUAL rules: how to deposit, what
  conditions trigger release, who can trigger it
- Eventually aiming for a system where:
  - Buyer deposits without talking to seller (depositor)
  - Seller provides goods/service without trusting buyer (beneficiary)
  - Arbiter just verifies when done
  - Money moves automatically without anyone needing to approve
    at the moment of transfer
- That's the core of decentralized finance (DeFi) - using code
  to replace traditional intermediaries with transparent,
  automatable trust

## Final Confirmed Flow

1. Depositor sends ETH to Escrow contract
2. Arbiter calls approve() when conditions are met
3. Money moves AUTOMATICALLY from Escrow to Beneficiary

## Constructor Storage - Completed

- Constructor takes arbiter and beneficiary as arguments
- depositor is automatically set to msg.sender (whoever deploys)
- Confirmed: 3 tests passing, verifying all three addresses stored correctly

## What Confused Me

- Placed constructor OUTSIDE the contract's closing brace initially
- Fixed by moving it inside the contract body

## Funding - Completed

- Made constructor payable
- Depositor sends ETH at deployment time, stored as the
  contract's balance
- Confirmed: 4 tests passing, including balance verification

## What I Learned

- payable can be added to a constructor, not just regular functions
- ETH sent during deployment becomes part of the contract's balance

## Approve - Completed

- Only the arbiter can call approve()
- Sends entire contract balance to beneficiary using .call
- Sets isApproved to true after successful transfer
- Confirmed: 3 tests passing

## Security Thoughts

- No check preventing approve() from being called TWICE
- After first approval, balance is 0, so second call would send
  0 ETH but isApproved would already be true anyway
- Worth considering: should there be a require(!isApproved) guard?
