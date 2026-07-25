# 44 — Receive and Fallback Functions

## What I Learned
- receive() runs when contract gets ETH with NO extra data
- fallback() runs when someone calls a function that doesn't exist
- Both must be external
- receive() must be payable, fallback() doesn't have to be
- Neither can accept arguments or return values
- payable keyword lets a function accept ETH (msg.value)

## Security Thoughts — Same Pattern As Faucet
- receive() {} is EMPTY - accepts ETH but has no withdraw function
- SAME locked funds vulnerability as before
- Any ETH sent here is PERMANENTLY STUCK
- Fix: add a withdraw() function with owner-only access:
  function withdraw() external {
      require(msg.sender == owner);
      payable(owner).transfer(address(this).balance);
  }
- RULE CONFIRMED AGAIN: every payable/receive function
  needs a corresponding withdraw path

## What Confused Me
- When does fallback() actually trigger?
- Answer: it triggers when someone calls a function
  that DOESN'T EXIST on the contract
- Example: typo in function name, or calling something
  that was never written
- Like a receptionist catching misdirected calls

## Questions I Still Have
- Confirmed understanding of fallback trigger conditions