# 46 — The `this` Keyword and Charity Donation

## What I Learned
- address(this) = the address of the CURRENT contract itself
- address(this).balance = how much ETH the contract currently holds
- donate() sends ALL contract balance to charity in one transaction
- Adding a new constructor parameter breaks EVERY existing test
  that deploys without that parameter - had to fix each one

## Security Thoughts
- donate() has NO access control - anyone can trigger it
- Question: should only owner be allowed to call donate()?
- address(this).balance is dynamic - always reflects CURRENT balance,
  not a fixed number

## What Confused Me
- Why specifically "donate" and "tip" as names?
- Answer: just labels chosen by the developer - NO special meaning
  Could be renamed to anything, same exact code/behavior

## Questions I Still Have
- What's the real world use case for this pattern?
- Answer: crowdfunding platforms (donate to charity),
  content creator tipping platforms, subscription/support services
  This EXACT pattern (forward ETH immediately) is used in
  real GoFundMe-style and Patreon-style blockchain apps