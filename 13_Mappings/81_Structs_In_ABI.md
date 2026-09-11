# 81 — Structs in Calldata & Memory (ABI)

## What I Did
- Built createVote() that RETURNS a Vote struct instead of storing it
- Used memory keyword for the return type
- view instead of external plain (reads msg.sender, doesn't write state)

## What I Learned
- ABIEncoderV2 allows structs to be passed/returned externally
- No longer "experimental" since Solidity 0.6.0 - safe for production
- Structs appear in the ABI as "tuple" type
- Nested structs create nested tuples in the ABI

## What Confused Me
- Broke through by recognizing this was nearly IDENTICAL to a
  previous contract, just changing "store" to "return"


## Questions I Still Have
- what do we use memory/calldata for?
- ANSWER: Memory and Calldata are just TEMPORARY storage
  locations - not permanent like storage
- Think of them like sticky notes vs whiteboard:
  - Storage = permanent whiteboard (persists between function calls)
  - Memory/Calldata = temporary sticky notes (only exist inside
    one function execution)
- Every function call starts with FRESH memory/calldata
- When function ends, memory/calldata is WIPED CLEAN
- calldata = read-only - cannot be modified
- memory = read-write - can be changed during function execution

  ## Key Takeaway
- storage = permanent, across function calls, persists on-chain
- memory = temporary, inside one function call, persists only
  while function is running
- calldata = read-only temporary storage for incoming parameters
