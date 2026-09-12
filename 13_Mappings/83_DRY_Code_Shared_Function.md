# 83 — DRY Code with Shared Internal Function

## What I Did
- Built findVote() as a shared INTERNAL helper
- hasVoted() and findChoice() both reuse findVote() instead of
  each writing their own separate loop

## What I Learned
- internal functions can only be called from WITHIN the contract
  (or contracts that inherit from it) - not from outside
- Returning a "sentinel" value (empty struct) is a way to signal
  "not found" when a function must always return SOMETHING
- Vote(Choices(0), address(0)) represents "no vote found"
- Check for "not found" by comparing: vote.voter == voter
  (if it matches the SEARCHED address, a real vote was found)

## Security Thoughts
- Looping through ALL votes every time is expensive and slow
  as the array grows large - a mapping(address => Vote) would
  be more gas-efficient for lookups, at the cost of losing
  the ORDERED history that an array provides