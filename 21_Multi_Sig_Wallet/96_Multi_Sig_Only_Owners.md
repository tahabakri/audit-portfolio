# 96 — Multi-Sig Only Owners

## What I Did

- Continued the Multi-Signature Wallet challenge.
- Updated the `confirmTransaction()` function.
- Added an ownership check before saving confirmations.
- Used `msg.sender` to identify who called the function.
- Looped through the `owners` array to check whether the caller is an owner.
- Used `require()` to reject non-owners.
- Ran the new Hardhat tests.
- Both tests passed.

---

## What I Expected

I expected only the addresses stored in `owners` to be able to confirm transactions.

Example:

```text
owners = [Alice, Bob, Charlie]
```

If Alice calls `confirmTransaction(0)`, it should succeed.

If David calls the same function but is not an owner, it should revert.

---

## What Actually Happened

The updated tests passed:

```text
MultiSig
  Confirm Transaction Tests
    from an invalid address
      ✔ should throw an error
    from a valid owner address
      ✔ should not throw an error

2 passing
```

The tests confirmed that:

- A non-owner cannot successfully confirm a transaction.
- A valid owner can confirm a transaction.

---

## What Confused Me

At first, I understood the individual lines but struggled to put them together in the correct place.

I accidentally wrote the owner-checking logic **outside** `confirmTransaction()`.

I learned that executable statements such as a `for` loop and `require()` belong inside a function.

I also confused the order of operations.

I initially placed:

```solidity
confirmations[transactionId][msg.sender] = true;
```

before checking ownership.

I understand now that it is better to check permissions first.

I also confused what `msg.sender` represents.

It is not automatically the owner.

It is simply the address that directly called the function.

---

## What I Think I Understand Now

### msg.sender

```solidity
msg.sender
```

means:

> The address that directly called the function.

Example:

```text
Alice calls confirmTransaction(0)

msg.sender = Alice
```

But Alice might or might not be in the `owners` array.

We need to check.

---

### isOwner

```solidity
bool isOwner = false;
```

This creates a temporary boolean variable.

At the beginning, we assume the caller is not an owner.

```text
isOwner = false
```

If we find their address in the owners list, we change it to:

```text
isOwner = true
```

---

### Looping Through Owners

```solidity
for (uint256 i = 0; i < owners.length; i++) {
    if (owners[i] == msg.sender) {
        isOwner = true;
    }
}
```

I read this as:

```text
Go through each owner
→ compare their address with msg.sender
→ if they match, isOwner becomes true
```

Example:

```text
owners[0] = Alice
owners[1] = Bob
owners[2] = Charlie

msg.sender = Bob
```

The loop checks:

```text
Alice == Bob → false
Bob == Bob   → true
```

So:

```text
isOwner = true
```

---

### require(isOwner)

```solidity
require(isOwner, "Not an owner");
```

Means:

> The caller must be an owner, otherwise revert.

If:

```text
isOwner = true
→ continue
```

If:

```text
isOwner = false
→ revert
```

The revert also prevents the confirmation from being successfully saved.

---

### Saving the Confirmation

Once ownership has been checked:

```solidity
confirmations[transactionId][msg.sender] = true;
```

This saves the caller's confirmation for that transaction ID.

Example:

```text
Bob calls confirmTransaction(2)
```

Then:

```text
confirmations[2][Bob] = true
```

Meaning:

> Bob confirmed transaction 2.

---

## My Updated Function

```solidity
function confirmTransaction(uint transactionId) public {
    // Assume the caller is not an owner.
    bool isOwner = false;

    // Check every address in the owners array.
    for (uint256 i = 0; i < owners.length; i++) {
        // Does the current owner match the caller?
        if (owners[i] == msg.sender) {
            isOwner = true;
        }
    }

    // Reject anyone who is not an owner.
    require(isOwner, "Not an owner");

    // Save the owner's confirmation for this transaction.
    confirmations[transactionId][msg.sender] = true;
}
```

The mental flow:

```text
Someone calls confirmTransaction()
→ identify the caller using msg.sender
→ search owners[]
→ if caller is not an owner, revert
→ otherwise save the confirmation
```

---

## Security Thoughts

### Access Control

Before this lesson, anyone could call `confirmTransaction()`.

Even though the counting function only counted addresses stored in `owners`, allowing non-owners to record confirmations was unnecessary and incorrect authorization behavior.

Now the function rejects non-owners.

**Auditor question:**

> Who is allowed to change this state?

---

### Validate Before Changing State

The function follows:

```text
Check permission
→ Save confirmation
```

I should remember that Solidity reverts roll back earlier state changes in the same transaction.

So checking permissions afterward would not automatically allow an attacker to bypass authorization.

However, checking first is clearer and avoids unnecessary work.

---

### Duplicate Confirmations

An owner can currently call `confirmTransaction()` again for the same transaction.

The mapping remains `true`, so the current counting function does not count that same address twice.

But the function does not explicitly reject the duplicate attempt yet.

**Auditor question:**

> Should confirming the same transaction twice revert?

---

### Invalid Transaction IDs

The function currently does not verify whether the supplied transaction ID exists.

An owner could call:

```solidity
confirmTransaction(999);
```

even when transaction 999 has not been created.

**Auditor question:**

> Should the contract check that a transaction exists before allowing confirmation?

---

### Duplicate Owner Addresses

The constructor does not currently reject duplicate owner addresses.

Because `getConfirmationsCount()` loops through the owners array, duplicate addresses could cause one owner's confirmation to be counted multiple times.

This could become a serious threshold-bypass risk.

**Auditor question:**

> Can the same address appear more than once in the owners list?

---

## What I Need to Remember Later

- `msg.sender` → address that directly called the function.
- `owners.length` → total number of owner entries.
- `owners[i]` → current owner address being checked.
- `owners[i] == msg.sender` → check whether the current owner matches the caller.
- `bool isOwner = false` → start by assuming the caller is not an owner.
- `isOwner = true` → caller was found in the owners array.
- `require(isOwner, "Not an owner")` → reject non-owners.
- `confirmations[transactionId][msg.sender] = true` → record the caller's confirmation.

**Main memory trick:**

```text
CHECK OWNER
→ REQUIRE OWNER
→ SAVE CONFIRMATION
```

---

## Questions I Still Have

- How can I check owner membership without looping through every address?
- Should we create an `onlyOwner` modifier?
- How do we reject duplicate owner addresses in the constructor?
- How do we stop confirmations for nonexistent transactions?
- How do we reject duplicate confirmation attempts?
- How will the contract execute a transaction once enough owners have confirmed?

---

## Git Commit

```bash
git commit -m "learn multisig owner-only confirmations"
```
