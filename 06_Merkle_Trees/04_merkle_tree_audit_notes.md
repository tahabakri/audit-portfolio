# Merkle Tree – Micro Learning Note

## What I did
Learned about Merkle trees and how to prove a transaction exists using only a small part of the tree (a Merkle proof).

## What I think is happening
To verify a transaction, only a few hashes are needed instead of the entire block, making verification efficient.

## Why it matters for security / audit mindset
If verification required all transactions, CPU, bandwidth, and storage use would be huge, which could be exploited by attackers.  
Always think: how does efficiency protect against resource exhaustion or denial-of-service attacks?

## Reflection / Audit Reminder
When learning any blockchain structure, ask:
- Could this process be abused?  
- How do efficiency and proof size relate to security?  