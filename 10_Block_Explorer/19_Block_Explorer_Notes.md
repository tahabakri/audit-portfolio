# 19 — Block Explorer Notes

## What I Did
I cloned a starter project and connected it to Alchemy API
so we can read real Ethereum mainnet data.
I displayed the block number, block hash, 
and transaction count on a webpage.

## What I Expected
I expected it to be more complicated to connect 
to a real blockchain.

## What Actually Happened
The app connected and showed real live data including
208 transactions in one block.

## What Confused Me
I was confused about && because I did not understand
why we could not just read block.hash directly.
Now I understand — if the block data has not loaded yet,
reading it crashes the page.
&& checks the data exists first before reading it.

## What I Think I Understand Now
Each block has a number, a hash, and a list of transactions.
The hash is a unique fingerprint of that block's data.

## Security Thoughts
- If someone changes data inside a block, the hash becomes invalid.
- This breaks every block after it — not before it.
- Each block contains the previous block's hash.
- Rebuilding the chain would require enormous energy.
- This property is called immutability.
- In code, && protects against reading data that does not exist yet.
  This is called a null check.