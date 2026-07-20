# 31 — Pure Functions

## What I Learned

- pure = does not read or write contract state
- Only uses the values passed in as parameters
- Different from view — view can READ state, pure cannot even do that
- Example: double(x) just uses x, never touches storage

## Security Thoughts

- pure functions are the safest kind
- They cannot be tricked into changing state
- Compiler enforces this — cannot be faked
- Good for pure math/logic that doesn't depend on contract data

## What Confused Me

- Difference between view and pure
- view = CAN read stored data, CANNOT change it
- pure = CANNOT read stored data, CANNOT change it
- pure only works with values passed in as parameters
- Example: view can do "return x"
  pure can only do "return y \* 2" (using input, not stored x)
- If pure tries to read x — compiler error
- If view tries to change x — compiler error

## Questions I Still Have

- Where is view/pure most commonly used?
- view: checking balances, ownership, prices — reading data for free
- pure: math calculations, unit conversions, validation logic
- Real example: Uniswap uses view for prices, pure for swap math
