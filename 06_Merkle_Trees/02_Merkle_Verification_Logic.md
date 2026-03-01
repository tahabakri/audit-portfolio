# Logic: Merkle Proof Verification

## 1. The Goal
How can I prove that a single transaction (a Leaf) is part of a Block (the Root) without looking at every other transaction?

## 2. The Verification Recipe
To verify, I need four ingredients:
1. **The Node:** The leaf I am checking (e.g., "Transaction A").
2. **The Proof:** A list of neighbor hashes and their positions (Left/Right).
3. **The Root:** The "CEO" hash stored in the block header.
4. **The Concat Function:** The tool to hash two things together.

## 3. The "Climbing" Algorithm
I start at the bottom and calculate my way to the top:
- I take my `node`.
- I look at the first `neighbor` in the proof.
- **Rule:** If the neighbor is on the **Left**, I hash it as `concat(neighbor, current)`.
- **Rule:** If the neighbor is on the **Right**, I hash it as `concat(current, neighbor)`.
- My result becomes the "current" hash for the next level.
- I repeat this until I finish the proof.

## 4. The Final Verdict
- If `Calculated_Root === Official_Root` -> **VALID.**
- If they don't match -> **FRAUD/TAMPERED.**

## 5. Auditor's Security Note
Why does the order (Left vs Right) matter? 
Because hashing is **Deterministic but Order-Sensitive**. 
`Hash(A + B)` is not the same as `Hash(B + A)`. If the auditor and the prover don't agree on the sides, the verification will fail even if the data is real.