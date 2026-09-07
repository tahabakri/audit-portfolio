# 74 — Indexed Events

## What I Did

- Added `indexed` keyword to address parameters in Deployed,
  Transfer, and Purchase events
- Fixed my own syntax mistake (word order: type THEN indexed)
- Wrote this from an ENGLISH description only, no code given

## What I Learned

- indexed makes an event argument SEARCHABLE/FILTERABLE
- Uses LOG0-LOG4 opcodes depending on number of indexed topics
- First topic is ALWAYS the event signature hash
- Max 3 additional indexed topics allowed (4 total with signature)
- Real use: eth_getLogs can filter by SPECIFIC address using topics

## What Confused Me

- What indexed actually DOES
- Clarified with library card catalog analogy:
  - WITHOUT indexed = reading EVERY book to find dragons
  - WITH indexed = search "dragons" and get instant results
- indexed makes an event ARGUMENT searchable/filterable from
  OUTSIDE apps (Etherscan, wallets, dApps)
- indexed does NOT affect who can call functions or modify data -
  purely about making data easier to FIND later
