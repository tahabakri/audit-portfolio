# 84 — Vote Once (Access Control on Actions)

## What I Did
- Added require(!hasVoted(msg.sender)) to createVote()
- Changed hasVoted from external to public so it could be
  called INTERNALLY from within createVote

## What I Learned
- external functions CANNOT be called from inside the same contract
- public functions CAN be called both externally AND internally
- This is the SAME "prevent duplicate action" pattern seen in
  vending machine, user mapping, and other earlier lessons -
  a recurring, essential security pattern

## Security Thoughts
- Without this check, one address could vote multiple times,
  completely undermining the integrity of the voting system
- This confirms the pattern: any system tracking a one-time
  action needs a check against repeated attempts