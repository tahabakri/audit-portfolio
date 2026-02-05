# Experiment 1: The Avalanche Effect

## What I did:
I used the Keccak-256 tool to test how sensitive the hash function is.

## My Results:
1. **Input 1:** "Taha"
   - **Hash Output:** [c0bb]
   
2. **Input 2:** "Taha " (Added just one space)
   - **Hash Output:** [84e0]

## The Auditor's Observation:
Did the hash change a little bit or completely?
["It changed completely. Even a tiny change in input results in a totally different hash output."]

## Why this matters for Security:
If a hacker tries to change a transaction from $10 to $100, the hash will change completely. The blockchain will see the mismatch and reject it immediately. This is called the **Avalanche Effect**.