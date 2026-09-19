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

## Questions I Still Have (Answered in Next Step)

- How will the contract split the final expense between all attendees? → By subtracting the bill from the contract balance and dividing by `attendees.length`.
- Why do we need the attendee array during the next stage? → To iterate over every attendee address to send their refund.
- Who will be allowed to trigger the final payment? → Currently anyone (an auditor security concern!).
- How will refunds or leftover ETH work? → `address(this).balance / attendees.length`.
- Could looping through a very large attendee array eventually create a gas problem? → Yes, classic unbounded loop / block gas limit DoS.

---

## Pay the Bill

### What I Did

- Added an external `payBill(address venue, uint amount)` function.
- Paid the venue from the ETH pooled inside the contract.
- Checked that the venue payment succeeded.
- Read the remaining contract balance.
- Divided the remaining ETH by `attendees.length`.
- Looped through the attendee array.
- Refunded each attendee an equal share.
- Checked that every refund succeeded.
- Ran a separate `PartyPayBill.test.js` test file.
- All 3 payBill tests passed.

### What Confused Me

- I understood the math before I could write the Solidity syntax.
- I struggled to remember `attendees.length`.
- I struggled to remember `attendees[i]` inside the loop.
- I needed to build the function one line at a time.

### What I Think I Understand Now

If the contract has:

```text
8 ETH pooled
4 ETH bill
4 attendees
```

then:

- venue gets 4 ETH
- 4 ETH remains
- 4 / 4 = 1 ETH refunded to each attendee

This:

```solidity
uint remaining = address(this).balance;
```

gets the ETH left after paying the venue.

This:

```solidity
uint share = remaining / attendees.length;
```

calculates each attendee's refund.

This:

```solidity
attendees[i]
```

means the current attendee while looping through the array.

### Security Thoughts

- `payBill()` currently has no access control.
- Any external caller can choose the venue and bill amount.
- External ETH calls can fail, so their return values are checked.
- A reverting attendee could cause the whole refund transaction to revert.
- Looping over a very large attendee array could eventually create a gas/DoS issue.
- Integer division may leave tiny leftover dust if the remainder does not divide evenly.

**Auditor question:**

> Who should actually be allowed to trigger `payBill()`?
