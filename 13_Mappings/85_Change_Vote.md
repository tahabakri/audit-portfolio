# 85 — Change Vote (Modifying Storage Structs)

## What I Did
- Built changeVote() to update an EXISTING vote's choice
- Loops through votes[], finds the match by voter address,
  updates votes[i].choice directly

## What I Learned
- votes[i].choice = choice modifies the REAL storage data
  (not a memory copy, since we're accessing the array element directly)
- This is different from findVote(), which returns a memory COPY -
  changing a memory copy would NOT affect the real array
- require(hasVoted(msg.sender)) reused the existing hasVoted()
  helper to block changing a vote that doesn't exist

## Security Thoughts
- Confirms earlier lesson: storage access modifies real data,
  memory access modifies only a temporary copy
- Important distinction for auditors: always check whether a
  function is reading a COPY or a REFERENCE before assuming
  changes will (or won't) persist