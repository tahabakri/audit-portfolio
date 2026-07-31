# 58 — Fallback Trigger

## What I Did
- Built makeContact() that sends random bytes (0x12345678) to Hero
- This calldata doesn't match any real function selector
- Triggers Hero's fallback() function instead

## What I Learned
- fallback() runs when calldata doesn't match ANY function selector
- Can trigger it on purpose by sending random/mismatched bytes
- Confirms understanding from earlier: fallback = "catch-all" handler

## Security Thoughts
- Fallback functions can be exploited if they contain sensitive logic
- Auditors check: does fallback() do anything dangerous
  if triggered unexpectedly (e.g., accidentally sent wrong calldata)?

## What Confused Me
- Why fallback() exists instead of just giving an error
- Answer: it's a CHOICE the developer makes
  - NO fallback function = mismatched calldata FAILS automatically
  - HAS fallback function = developer CHOOSES to catch it instead
- Real use case: logging unknown interactions, or accepting
  general/unexpected calls gracefully instead of rejecting them

## Questions I Still Have
- Why does fallback() run even with random bytes like hex"12345678"?
- Answer: EVM interprets ANY calldata without a matching function selector
  as a call to fallback()
- It's like dialing an extension that doesn't exist - receptionist
  (fallback) still picks up, instead of the call failing immediately

- What would happen if Hero had NO fallback function?
- Answer: If I sent hex"12345678" to Hero WITHOUT a fallback(),
  the transaction would automatically revert with an error like:
  "No code at address" OR "Function selector not found"
- Having fallback() gives the developer CONTROL over unknown calls
- Without it = strict "only exact functions allowed" policy
- With it = catch-all "handle this somehow" policy

- Why do real contracts use fallback() instead of just failing?
- Answer: depends on the contract's purpose
  - Tokens (ERC20): often have no fallback - wrong call fails
  - DAOs / Multi-sigs: DO have fallback - process approved calls
  - Forwarding contracts: MUST have fallback - forward anything
  - It's a design CHOICE: be strict vs flexible