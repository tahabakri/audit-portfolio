## Practical Build - Vending Machine
- Built VendingMachine.sol using mapping(address => uint)
- Tracks sodasPurchased PER ADDRESS
- All 3 tests passing (stock tracking, per-address tracking, decrementing stock)

## VULNERABILITY FOUND - No Per-Person Limit
- purchaseSoda() has NO limit on repeated calls
- sodasPurchased[msg.sender] += 1 just COUNTS, doesn't PREVENT repetition
- ONE person could call this 10 times, buying ALL available stock
- SAME pattern as increment() vulnerability found earlier today
- Possible fix: require(sodasPurchased[msg.sender] == 0, "Already purchased")

## FIX APPLIED AND VERIFIED
- Added: require(sodasPurchased[msg.sender] == 0, "Already purchased")
- This limits each address to exactly ONE soda purchase
- Wrote a NEW test proving a second purchase attempt FAILS
- All 13 tests passing, including the fix verification

## Complete Audit Workflow Demonstrated Today
1. IDENTIFY vulnerability (unlimited purchases per address)
2. FIX it (add require check using the mapping's own value)
3. VERIFY the fix works (write a test proving it)