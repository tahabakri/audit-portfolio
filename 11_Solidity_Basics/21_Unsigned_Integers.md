# 21 — Unsigned Integers

## What I Learned

### uint types
- `uint8` = 8 bits = can hold 0 to 255 (256 unique values)
- `uint16` = 16 bits = can hold 0 to 65535
- `uint256` = the largest = used for sums to stay safe
- `uint` alone = same as `uint256`

### Why uint256 for sum?
Adding two numbers can produce a result bigger than either one.
We use uint256 because its ceiling is so high
we will practically never overflow it.

### Math operators in Solidity
Same as JavaScript: + - * / % **

## What Confused Me
- How bits relate to the maximum number
- 8 bits = 2 to the power of 8 = 256 unique values = 0 to 255

## Security Thoughts
- Overflow = when a number exceeds its maximum and wraps to zero
- Example: uint8 x = 255; x + 1 = 0 (old Solidity)
- Attackers used this to mint tokens from nothing
- Or to make balances wrap to huge numbers
- Famous example: BEC token hack 2018
- Solidity 0.8.0+ now reverts on overflow automatically
- Always check what Solidity version a contract uses
- Old contracts (before 0.8.0) need SafeMath library to be safe

## Questions I Still Have
- What other math tricks can attackers use on numbers?