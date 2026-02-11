# Logic: Hashing a Block

## The Goal
We need to ensure the data inside the block (`id`) hasn't been tampered with.

## The Process
1.  **Serialization:** Convert the Object `{id: 0}` into a String `"{id:0}"`.
    *   *Code:* `JSON.stringify(block)`
2.  **Hashing:** Run SHA256 on that string.
3.  **Attaching:** Add the resulting hash to the block object.

## Auditor Note (CRITICAL)
**Order of Operations Matters.**
If you add the `hash` property *before* you calculate the hash, you create a "Circular Reference" (trying to hash the hash itself infinitely).
*   Correct: Create Data -> Hash Data -> Attach Hash.
*   Incorrect: Create Data -> Attach Empty Hash -> Hash Data.