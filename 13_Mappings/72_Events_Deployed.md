# 72 — Events: Deployed Event

## What I Did
- Built Collectible.sol emitting a Deployed event with owner's address
- Wrote a test that PARSES the raw event log directly using
  interface.getEvent().topicHash and interface.parseLog()

## What I Learned
- return values are NOT saved to blockchain - only visible during
  the immediate transaction call
- Events ARE permanently logged, searchable later via eth_getLogs
- Event "topics" include the hash of the event SIGNATURE
  (keccak256 of "Deployed(address)")
- "data" field contains the actual ARGUMENT values passed in

## Real World Purpose - Confirmed
- Like a "birth certificate" for a contract - permanently recording
  WHO deployed it, searchable across MANY different deployments
  without checking each contract's storage individually

## Security Thoughts
- Events give auditors a way to trace CONTRACT HISTORY without
  needing expensive storage reads
- anonymous events save gas but make filtering/identification harder

## What Confused Me
- What does "anonymous" event mean?
- Answer: removes the SEARCHABLE topic/label from an event
- Normal event = labeled box, easy to find/filter
- Anonymous event = unlabeled box, saves tiny gas but
  harder to identify which event type fired
- Rarely used in practice - advanced/niche optimization