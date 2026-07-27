# 48 — Reverting Transactions

## What I Learned
- REVERT is a native EVM opcode
- revert, require, assert all use this feature
- Reverting undoes ALL state changes in that transaction
- BUT gas is still charged - real computational work was done

## Real World Example - Uniswap
- Trade failed: "INSUFFICIENT_OUTPUT_AMOUNT"
- Between signing and processing, market price changed
- Safety check prevented user from getting a WORSE deal
  than they originally agreed to
- This protects against something called "slippage"

## Security Thoughts
- require() checks protect users from unexpected bad outcomes
- Even failed transactions cost gas - miners did real work
- Auditors check: are there enough safety checks (require statements)
  to protect users from changing conditions between sign and execute?

## What Confused Me
- Why does revert matter if gas is lost anyway?
- Answer: TWO separate costs - gas fee (always lost) vs 
  the actual trade/transaction amount (PROTECTED by revert)
- Without revert: lose gas AND get a bad trade
- With revert: lose ONLY gas, bad trade is prevented
- Revert saves you from a MUCH bigger loss, even though
  the smaller gas cost is unavoidable either way

## Questions I Still Have
- Can failed transactions still be analyzed later?
  Answer: YES - Block explorers (like Etherscan) show ALL transactions
  including failed ones with revert reasons
  This is CRITICAL for debugging and accountability
  Failed transactions prove that a safety check WORKED correctly