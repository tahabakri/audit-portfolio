# 53 — Calldata

## What I Learned
- calldata = the raw data sent with a transaction/message call
- Function calls get converted into calldata format:
  1. First 4 bytes = function signature hash (keccak256, first 4 bytes)
  2. Remaining data = the actual arguments passed in

## Why Use 4-Byte Function Signatures?
- NOT about security - it's about EFFICIENCY
- Function names could be very long (expensive to send as data)
- Hashing converts ANY name to a FIXED 4-byte size
- Cheaper gas costs, faster processing
- Analogy: using a room number instead of writing a full name

## Security Thoughts
- Understanding calldata helps auditors read raw transaction data
- Function selectors (4-byte codes) can help identify WHAT
  a suspicious transaction is actually trying to call

## What Confused Me
- Initially thought 4-byte signatures were for security/anti-copying
- Corrected: it's actually about SIZE EFFICIENCY, not security

## Questions I Still Have
- Why does the function selector use keccak256 at all?
- Answer: to create a UNIQUE identifier for each function
- Since names can be long, hashing gives a fixed-size fingerprint
- Analogy: like fingerprints for people - same length, unique
  identities
