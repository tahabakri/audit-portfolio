# 38 — Value Transfer and Payable Functions

## What I Learned

- payable = function is allowed to RECEIVE ether
- msg.value = the amount of ETH sent with the transaction
- Attach ETH in JavaScript using { value: ethers.parseEther("1") }
- Must be the LAST argument in the function call

## Security Thoughts — CRITICAL

- This lesson's contract has NO withdraw function
- ETH sent to deposit() is PERMANENTLY LOCKED
- This is called "locked funds" or "stuck ether" vulnerability
- Real contracts have lost millions of dollars this way
- RULE: Every payable function needs a corresponding withdraw function
- Auditor question: "Where does deposited ETH go? Can it be retrieved?"

## What Confused Me

- Why can't we fix the contract after deployment?
  Answer: smart contracts are immutable once deployed
  Same principle as block hashes — cannot be changed after

## Questions I Still Have

- Are there templates to avoid mistakes like this?
- Answer: YES — OpenZeppelin provides audited, tested templates
  Example: Ownable pattern includes proper withdraw functions
  This is why auditors review contracts BEFORE deployment —
  mistakes cannot be fixed after
