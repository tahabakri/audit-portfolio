# 22 — Signed Integers

## What I Learned

### int vs uint
- `int` = signed = can be negative or positive
- `uint` = unsigned = always positive, starts from zero
- `int8` ranges from -128 to 127
- `uint8` ranges from 0 to 255
- Both have 256 total possible values

### Why we cast to int16 before calculating
- When we subtract two int8 values the result can be
  bigger than int8 can hold
- Example: 127 - (-128) = 255 which overflows int8
- We cast to int16 first to give the calculation enough space
- Always make sure the result type is big enough

## What Confused Me
- Why the positive side of int8 is only 127 not 128
- Answer: zero takes one spot so the range is
  -128 to 0 to 127 = 256 total values

## Security Thoughts
- Using too small a type causes overflow
- Before Solidity 0.8.0 overflow did not revert
  it silently wrapped around to wrong values
- Attackers exploited this to mint fake tokens
  or reset balances to huge numbers
- Always use a type big enough for the worst case calculation
- Always check what Solidity version a contract uses

## Questions I Still Have
- Are there other number tricks attackers use
  besides overflow and underflow?