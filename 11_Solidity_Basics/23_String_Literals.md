# 23 — String Literals

## What I Learned
- `bytes32` = fixed size, max 32 bytes, cheaper gas
- `string` = dynamic size, any length, more expensive
- Short text under 32 bytes → use bytes32
- Long text over 32 bytes → use string

## Security Thoughts
- All on-chain data is public — even bytes32
- Never store passwords or secrets as strings
- Long data is stored on IPFS with hash on-chain
- Risk: if IPFS data disappears the hash is useless
- This is called off-chain dependency risk
- Solution: use permanent storage like Arweave

## What Confused Me
- How to know if text fits in 32 bytes
  Answer: 1 English character = 1 byte
  Count the characters — if under 32 it fits
  Special characters like ć take 2 bytes each

- How data disappears on IPFS
  Answer: IPFS relies on volunteers hosting files
  If nobody hosts the file anymore it disappears
  It is not a permanent server