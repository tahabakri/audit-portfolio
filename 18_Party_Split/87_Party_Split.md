# 87 — Party Split: RSVP

## What I Did

- Started Week 6 with the Party Split challenge.
- Created a `Party` contract.
- Added a constructor that receives the required RSVP deposit.
- Stored the deposit in a state variable so the contract remembers it.
- Created an `external payable` `rsvp()` function.
- Required users to send exactly the correct ETH amount.
- Used a mapping to stop the same address from RSVP'ing twice.
- Used an address array to keep a list of everyone who joined.
- Ran the provided tests locally with Hardhat.

## What I Expected

I expected:

- someone sending the exact deposit to join successfully
- sending too little ETH to revert
- sending too much ETH to revert
- the same wallet trying twice to revert
- successful deposits to stay inside the Party contract

## What Actually Happened

The Solidity logic worked, but the original Alchemy test used ethers v5 syntax.

My project uses ethers v6, so the test initially failed with:

`ethers.utils` being undefined.

The test needed these v6 changes:

- `ethers.utils.parseEther()` → `ethers.parseEther()`
- `contract.address` → `contract.target`
- BigNumber `.eq()` → native bigint comparison

After fixing the test compatibility, the Party tests passed.

## What Confused Me

- At first I did not understand what the challenge meant by `amount`.
- I eventually understood that `amount` is simply the RSVP price passed into the constructor.
- I confused a getter with `msg.sender`.
- I forgot that the current caller's address is `msg.sender`.
- I initially did not understand why both a mapping and an array were needed.
- I also made a spelling mistake between `attendess` and `attendees`.

## What I Think I Understand Now

The constructor:

```solidity
constructor(uint256 amount) {
    deposit = amount;
}
```

means:

When the contract is deployed, remember how much ETH each attendee must pay.

Inside `rsvp()`:

- `msg.value` = how much ETH this caller sent.
- `msg.sender` = the wallet/address directly calling the function.

This:

```solidity
require(msg.value == deposit, "Wrong deposit");
```

means the caller must send exactly the RSVP price.

This:

```solidity
mapping(address => bool) public hasRSVPed;
```

is good for asking:

> *Has this specific address already joined?*

This:

```solidity
address[] public attendees;
```

is good for asking:

> *Who are all the people who joined?*

I need both because a mapping cannot give me a list of all its keys.

## Security Thoughts

The two important rules currently are:
1. A caller must pay exactly the required deposit.
2. One address cannot RSVP twice.

- Without the first check, users could join while paying the wrong amount.
- Without the second check, one wallet could RSVP repeatedly and corrupt the attendee/accounting logic.
- The contract currently holds ETH after people RSVP, so an auditor question for the next stage is:
  > *Where does this ETH go, and how does it come back out?*

## Questions I Still Have

- How will the contract split the final expense between all attendees?
- Why do we need the attendee array during the next stage?
- Who will be allowed to trigger the final payment?
- How will refunds or leftover ETH work?
- Could looping through a very large attendee array eventually create a gas problem?