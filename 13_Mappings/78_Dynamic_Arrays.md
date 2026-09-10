# 78 — Dynamic Arrays

## What I Did
- Built sum() for a dynamic array uint[] calldata
- Used numbers.length instead of a hardcoded size
- Fixed multiple syntax mistakes myself: for-loop structure,
  misplaced accumulation, leftover console.log, missing semicolons

## What I Learned
- Dynamic arrays: uint[] means size is NOT known at compile time
- .length works the same way on fixed and dynamic arrays
- for(start; condition; step) - each part has a specific job:
  start = initialize counter, condition = when to stop,
  step = what happens after each loop (usually i++)
- The loop BODY (inside {}) is where actual work happens,
  not in the step position

## Security Thoughts
- Same pattern as before: loop through array → update counter
- This loop pattern is NOW FAMILIAR - I've written it multiple times
  (vending machine, arrays and structs, array sum)
- Repetition builds memory - recognize patterns, not syntax
- The core pattern: initialize → loop until condition → update
  This will appear in MANY contracts, not just array processing
- Pattern recognition > syntax memorization

## What Confused Me
- For loop structure took me longest to get right
  return inside vs outside loop caused 2-3 hours of trial/error
- This confirms the pattern is MORE IMPORTANT than syntax
- Break through came when I stopped trying to memorize syntax
  and started focusing on the LOGICAL FLOW:
  1. Need a total
  2. Need to process each item
  3. Need to return total AFTER processing all items
  Once the logic clicked, the syntax fell into place

## Questions I Still Have
- How do fixed vs dynamic arrays behave DIFFERENTLY in memory?
  - Fixed array (uint[5]): ALL 5 slots exist always, even if empty
    memory layout is fixed and predictable
  - Dynamic array (uint[]): ONLY existing elements take space
    size can grow or shrink, memory layout is flexible
  - Key insight: both use .length the SAME, but underlying
    storage mechanics are different
- Does this affect gas costs?
  - Yes - dynamic arrays cost more to process per element
    because their size can change (more overhead)
  - Fixed arrays have predictable gas costs
  - Auditors consider this for gas optimization analysis
- Are there OTHER array types?
  - Yes - multidimensional arrays (uint[][]), etc.
  - But the core concepts (loops, indexing, .length) remain
    the same - just more nested
- How do arrays compare to mappings?