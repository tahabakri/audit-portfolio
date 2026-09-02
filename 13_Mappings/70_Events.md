# 70 — Events

## What I Did
- Built EventDemo.sol with a PointsAdded event
- Wrote a test using expect().to.emit().withArgs() to VERIFY
  the event fires correctly with expected values

## What I Learned
- Events = permanent LOGS stored in transaction receipts
- Contracts CAN emit events but CANNOT read them back
- indexed keyword allows FILTERING/searching by that value later
- Already used this EARLIER today (WinnerTarget's Winner event)
  without knowing the terminology

## Real World Purpose
- NOT just for developer debugging
- Front-end apps (MetaMask, Etherscan, dApp UIs) LISTEN for events
  to update displays in REAL-TIME (e.g. "Transfer Successful")
- CHEAPER than storing everything in contract storage forever
- Etherscan shows COMPLETE history of events without contract
  needing to store all that data internally

## Security Thoughts
- Events are useful for AUDITORS too - can trace transaction
  HISTORY by reading emitted events, without needing to read
  raw contract storage

## What Confused Me
- The expect().to.emit().withArgs() chained syntax
- Broken down: "I EXPECT this action TO EMIT this event
  WITH these EXACT arguments"
- Like a sentence structure, just chained together

## Questions I Still Have
- Why is it like "feedback" of running code?
- CONFIRMED: YES, exactly like a receipt printer at a store
- Cash register (contract) prints receipt (emits event) and
  hands it OUTSIDE, without keeping every receipt internally
- Blockchain keeps the PERMANENT record externally (transaction
  receipts), contract itself doesn't need to remember forever

  ## Key Takeaway
- Events let contracts COMMUNICATE EXTERNALLY about what just
  happened, without storing it internally forever
- Like logging a message that the outside world can subscribe to
- CHEAP, efficient, and exactly what frontend dApps need to
  display real-time updates