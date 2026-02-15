# Logic: Validating the Chain

## The "Police" Function (`isValid`)
We cannot trust data just because someone sent it to us. We must verify the mathematical links.

## The Check
For every block `i`:
`Block[i].previousHash` == `Block[i-1].toHash()`

## The Attack Vector
1.  Hacker changes Block #5.
2.  Hacker sends me the chain.
3.  My node calculates hash of Block #5.
4.  My node checks Block #6. Block #6 says "My previous hash was 0xABC."
5.  But the *actual* hash of the hacked Block #5 is "0xBAD".
6.  **Mismatch.** My node rejects the hacker's chain.

## "Longest Chain" Rule (Consensus)
*   If I see two valid chains, which one is the "Truth"?
*   **Rule:** The chain with the most blocks (most work) wins.
*   **Why?** Because it required the most energy (electricity) to create.