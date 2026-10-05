# 95 — Multi-Sig Owner Confirmations

## What I Did

- Added a `confirmTransaction()` function.
- Added a `getConfirmationsCount()` view function.
- Used the nested `confirmations` mapping to store who confirmed which transaction.
- Used `msg.sender` to identify the address confirming the transaction.
- Looped through all owners to count how many confirmed a specific transaction.
- Ran the tests successfully.

```text
MultiSig
  after creating the first transaction
    ✔ should confirm the transaction
    after creating the second transaction
      ✔ should confirm the transaction twice

2 passing
```

---

## What I Expected

I expected:

```text
confirmTransaction(transactionId)
```

to save that the caller confirmed that specific transaction.

And:

```text
getConfirmationsCount(transactionId)
```

to count how many owners confirmed that specific transaction.

Example:

```text
Transaction 0

Alice   → confirmed
Bob     → confirmed
Charlie → not confirmed
```

Then:

```text
getConfirmationsCount(0)
```

should return:

```text
2
```

---

## What Actually Happened

The contract successfully stored confirmations using:

```solidity
confirmations[transactionId][msg.sender] = true;
```

and successfully counted them by looping through the owners.

The tests confirmed:

```text
one owner confirmation
→ count = 1

two owner confirmations
→ count = 2
```

---

## What Confused Me

I copied the code at first without really understanding why both functions were needed.

I mixed up:

```solidity
confirmTransaction()
```

with:

```solidity
getConfirmationsCount()
```

I understand now that they do different jobs.

---

## What I Think I Understand Now

### confirmTransaction()

```solidity
function confirmTransaction(uint transactionId) public {
    confirmations[transactionId][msg.sender] = true;
}
```

This function does NOT loop.

It only saves one confirmation.

Example:

```text
Alice calls:

confirmTransaction(2)
```

Then:

```text
confirmations[2][Alice] = true
```

Meaning:

> Alice confirmed transaction ID 2.

---

### Why transactionId Matters

There can be many transactions:

```text
transaction 0
transaction 1
transaction 2
```

So the contract needs to know which one Alice is confirming.

Example:

```solidity
confirmTransaction(2);
```

means:

> confirm transaction 2

not transaction 0 or 1.

---

### msg.sender

Inside:

```solidity
confirmations[transactionId][msg.sender] = true;
```

`msg.sender` means:

> the address that directly called `confirmTransaction()`

Example:

```text
Alice calls confirmTransaction(0)
```

Then:

```text
msg.sender = Alice
```

So the contract stores:

```text
transaction 0
Alice
true
```

---

### getConfirmationsCount()

This function does the counting:

```solidity
function getConfirmationsCount(uint transactionId)
    public
    view
    returns (uint256)
{
    uint256 count = 0;

    for (uint256 i = 0; i < owners.length; i++) {
        if (confirmations[transactionId][owners[i]]) {
            count++;
        }
    }

    return count;
}
```

Mental model:

```text
start count at 0
→ check every owner
→ if confirmed = true
→ add 1
→ return final count
```

---

## The Difference Between the Two Functions

This is the main thing I need to remember:

```text
confirmTransaction(id)
= SAVE one owner's confirmation

getConfirmationsCount(id)
= COUNT all owner confirmations for that transaction
```

Example:

```text
Alice calls confirmTransaction(1)
Bob calls confirmTransaction(1)
```

Stored:

```text
confirmations[1][Alice] = true
confirmations[1][Bob] = true
```

Then:

```text
getConfirmationsCount(1)
```

returns:

```text
2
```

---

## How the Nested Mapping Fits In

The mapping is:

```solidity
mapping(uint256 => mapping(address => bool)) public confirmations;
```

I read it as:

```text
transaction ID
→ owner
→ confirmed?
```

Example:

```solidity
confirmations[3][Bob]
```

means:

> Has Bob confirmed transaction 3?

---

## Why We Loop Through owners

Mappings do not have `.length` and cannot directly tell us how many entries are `true`.

So we use:

```solidity
owners.length
```

and check each owner.

Example:

```text
owners = [Alice, Bob, Charlie]
```

For transaction 0:

```text
Alice   → true
Bob     → true
Charlie → false
```

The loop does:

```text
Alice   → true  → count = 1
Bob     → true  → count = 2
Charlie → false → count stays 2
```

Then:

```solidity
return count;
```

returns:

```text
2
```

---

## Security Thoughts

### Only Owners Should Confirm

Right now:

```solidity
function confirmTransaction(uint transactionId) public
```

does not check whether `msg.sender` is an owner.

So even a random address can set:

```text
confirmations[id][randomAddress] = true
```

However, the counting function only loops through:

```solidity
owners
```

so the random address would not currently increase the confirmation count.

Still, this is unnecessary state and weak access control.

Auditor question:

> Who is allowed to call `confirmTransaction()`?

---

### Duplicate Confirmations

If Alice calls:

```solidity
confirmTransaction(0);
```

twice, the mapping just stays:

```text
true
```

It does not become two confirmations.

That is useful because:

```text
one owner
→ one bool
```

But later the contract should probably explicitly reject duplicate confirmations.

Auditor question:

> Can one owner confirm the same transaction more than once?

---

### Invalid Transaction IDs

Right now, someone could try:

```solidity
confirmTransaction(999);
```

even if transaction 999 does not exist.

The mapping can still store:

```text
confirmations[999][Alice] = true
```

because mappings allow unused keys.

Auditor question:

> Does the transaction actually exist before someone can confirm it?

---

## What I Need to Remember Later

```text
confirmTransaction(id)
= save confirmation
```

```text
getConfirmationsCount(id)
= count confirmations
```

```solidity
confirmations[id][msg.sender] = true;
```

means:

> this caller confirmed this transaction

```solidity
owners[i]
```

means:

> current owner being checked

```solidity
count++;
```

means:

> one more owner confirmed

---

## Tiny Memory Trick

Think:

```text
CONFIRM = WRITE
COUNT = READ + LOOP
```

So:

```text
confirmTransaction()
→ writes true

getConfirmationsCount()
→ reads the mapping and counts true values
```

---

## Questions I Still Have

- How do we restrict `confirmTransaction()` to owners only?
- How do we reject invalid transaction IDs?
- How do we stop duplicate confirmation attempts?
- When should the transaction execute after enough confirmations?
- How does the contract know when `count >= required`?
- Should execution happen automatically after confirming, or through a separate function?
