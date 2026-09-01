# 65 — Members Mapping

## What I Did
- Built mapping(address => bool) to track membership
- Added addMember() function with onlyOwner protection
- Proved via tests: members work correctly, non-owners are blocked

## What I Learned
- mapping(address => bool) is perfect for yes/no tracking
  (voting eligibility, membership, whitelist status)
- Function parameter template to remember:
  function [NAME]([TYPE] [_paramName]) [visibility] { ... }
- Mappings default to false/0 for any key never explicitly set

## Security Thoughts
- Visibility (external) controls WHO CAN CALL a function
- Access control (onlyOwner) controls WHO IS AUTHORIZED to succeed
- These are SEPARATE concepts - fixing one doesn't fix the other
- addMember() needed onlyOwner added - without it, ANYONE could
  add themselves (or anyone) as a member with zero permission

## What Confused Me
- Kept mixing up visibility vs access control as the same thing
- Clarified: visibility = can call it, access control = should succeed

## Questions I Still Have
- Why build from scratch instead of using proven templates?
- FINAL ANSWER: templates are for BUILDING apps fast
  Auditing requires UNDERSTANDING internals to VERIFY
  whether someone ELSE used a template CORRECTLY
- AI should be used to VERIFY/EXPLAIN, not WRITE code for me
  before I've attempted it myself

  ## isMember Function
- Manually wrote a getter function that mimics the auto-generated one
- Confirms: even though `members` is public (auto-getter exists),
  you CAN write your own custom getter function too
- Useful when: mapping is PRIVATE, or you want a different function name
- IMPORTANT: private mappings can STILL be read from raw blockchain
  storage by anyone - private only blocks OTHER CONTRACTS from
  reading through normal Solidity calls

  ## removeMember Function
- Added removeMember() - the "undo" for addMember()
- Sets mapping value back to FALSE
- Protected with onlyOwner (same access control as addMember)

## Key Lesson - Mappings vs Arrays for Removal
- Arrays: removing an item requires SHIFTING every element after it
  (expensive - many storage operations)
- Mappings: removing is just flipping ONE value to false
  (cheap - single operation, no shifting needed)
- This is a REAL cost/efficiency advantage mappings have over arrays
