# 77 — Fixed Arrays and Data Location

## What I Did
- Built sum() function taking uint[5] calldata, returning the total
- Wrote the loop and running total accumulation myself,
  fixing my own placement mistakes (return inside vs outside loop)

## What I Learned
- Three data locations: calldata, memory, storage
- calldata: read-only, used for EXTERNAL function array parameters
- memory: temporary, used for LOCAL variables during execution
- storage: permanent, where STATE variables live (expensive)
- Fixed arrays: uint[5] means EXACTLY 5 elements, size set at compile time
- return must be placed AFTER the loop finishes, not inside it,
  otherwise the function exits after just the first iteration

## Security Thoughts
- memory arrays are COPIES - modifying them does NOT affect
  the original storage array
- storage arrays are REFERENCES - modifying them DOES affect
  the original data
- Auditor question: does this function COPY data (safe) or
  REFERENCE it (could unintentionally modify state)?

## What Confused Me
- Confused about why memory was needed for the input array
  Answer: EXTERNAL functions cannot access storage arrays directly,
  so they receive the array via calldata (read-only temporary)
  If the function was PUBLIC or INTERNAL, it could use storage directly
  Calldata is for data coming INTO the function from the outside

- Why calldata instead of memory here?
  Answer: calldata is CHEAPER, and since we're only READING
  the array (not modifying it), calldata is the best fit
- Why pure instead of view?
  Answer: pure = doesn't touch ANY state variable at all
  view = reads state variables
  sum() only uses the passed-in array, never touches contract state,
  so pure is correct
- Why do these choices matter at all?
  Answer: every choice affects GAS COST - being precise saves
  real money for anyone calling this function