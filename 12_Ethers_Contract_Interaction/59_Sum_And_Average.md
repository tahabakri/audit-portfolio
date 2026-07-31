# 59 — Sum and Average

## What I Did
- Built a pure function returning TWO values (sum, average)
- Practiced tuple returns again after heavy calldata lessons

## What I Learned
- returns(uint, uint) means TWO separate return values
- Calculate each value SEPARATELY with local variables first
  uint sum = x + y + z + w;
  uint average = sum / 4;
- Then return them together: return (sum, average);
- Don't try to combine everything into ONE expression -
  breaking it into steps avoids syntax mistakes

## What Confused Me
- Kept trying to combine calculation and return into ONE line
- Breaking it into separate steps (sum first, then average,
  then return) made it much clearer

## Questions I Still Have
- Why pure functions return values automatically
- Answer: pure means NO state changes + can run offline
- Without return = useless to call
- Since calculation is deterministic (just math, no blockchain), EVM
  can compute it without sending a real transaction
- Think of it as "read-only math that doesn't touch the blockchain"

- Does "pure" mean "no gas costs"?
- Answer: NOT QUITE
- Calling pure externally = still costs gas (to execute the computation)
- But if called internally from another function, computation is free
- Key point: pure functions DON'T read or write storage -
  that's why they're "pure"

- Could I optimize this by calculating on frontend instead?
- Answer: YES, because it's pure!
- Since no blockchain interaction: can calculate in browser
- Web3.js/ethers.js can call pure functions offline
- Saves gas for users, much faster