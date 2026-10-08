# 97 — Multi-Sig Submit Transactions

## What I Did

- Continued the Multi-Signature Wallet challenge from Alchemy University.
- Created a new `submitTransaction()` function.
- Made it `external` so users can submit transaction proposals.
- Reused my existing `addTransaction()` and `confirmTransaction()` functions.
- Changed `addTransaction()` from `public` to `internal`.
- Tested the contract using Hardhat.

**Result: 3 tests passed.**

---

## What I Expected

I expected the new function to perform two actions in one call:

1. Create a transaction proposal.
2. Automatically confirm that proposal for the owner who submitted it.

I also expected `addTransaction()` to become inaccessible directly from outside the contract.

---

## What Actually Happened

My final function:

```solidity
function submitTransaction(address _destination, uint256 _value) external {
    uint256 txId = addTransaction(_destination, _value);
    confirmTransaction(txId);
}
```

Hardhat output:

```text
MultiSig
  Submit Transaction Tests
    ✔ should add a transaction
    ✔ should confirm a transaction
    ✔ should not call addTransaction externally

3 passing (3s)
```

All three tests passed.

The submitting owner now creates and confirms a transaction in one call.

**Important:** The transaction is only proposed and confirmed. ETH is not transferred to the destination yet.

---

## What Confused Me

I initially confused function names with the arguments passed into those functions.

When writing:

```solidity
uint256 txId = addTransaction(_destination, _value);
```

I wasn't sure what should go inside the parentheses.

I learned that `_destination` and `_value` come from the inputs of `submitTransaction()`.

I also needed to understand why we save the result in `txId`.

The `addTransaction()` function returns the ID of the newly created transaction. We need that ID to confirm the correct transaction.

---

## What I Think I Understand Now

### 1. Reusing existing functions

Instead of rewriting the logic for creating and confirming transactions, I can call functions that already exist.

```solidity
uint256 txId = addTransaction(_destination, _value);
```

This creates a transaction and stores its ID.

Then:

```solidity
confirmTransaction(txId);
```

This confirms the newly created transaction.

The execution order is:

```text
Owner calls submitTransaction()
          ↓
addTransaction()
          ↓
New transaction stored
          ↓
Transaction ID returned
          ↓
confirmTransaction(txId)
          ↓
Owner's confirmation saved
```

### 2. The `txId` variable

```solidity
uint256 txId = addTransaction(_destination, _value);
```

I understand this as:

- `uint256` — type of variable.
- `txId` — variable name.
- `addTransaction(...)` — function being called.
- `=` — save the returned value in `txId`.

Example:

```text
Current transactions.length = 3

New transaction is created
→ ID = 3
→ txId = 3

confirmTransaction(3)
→ confirms transaction 3
```

### 3. `external` vs `internal`

```solidity
function submitTransaction(...) external
```

This function is available to callers outside the contract.

```solidity
function addTransaction(...) internal
```

This function is only callable internally by the contract and its derived contracts.

I learned that reducing unnecessary external functions makes the contract easier to secure.

---

## Security Thoughts

### 1. Non-owners cannot successfully submit transactions

I worked through this scenario:

What happens if David, who is not an owner, calls `submitTransaction()`?

```text
David calls submitTransaction()
          ↓
addTransaction() creates proposal
          ↓
confirmTransaction() checks ownership
          ↓
David is not an owner
          ↓
require() fails
          ↓
Entire transaction reverts
```

I correctly predicted that the result would be **B: the entire call reverts**.

This taught me that a revert rolls back earlier state changes in the same transaction.

Even though `addTransaction()` ran first, the proposal does not remain in storage after the revert.

### 2. Reduce the attack surface

Making `addTransaction()` internal means an external caller cannot bypass `submitTransaction()` by calling it directly.

A useful auditor question:

**Does this function really need to be publicly accessible?**

### 3. Transaction submission is not execution

The new transaction is stored with:

```solidity
executed = false;
```

Submitting a transaction does not send ETH.

The wallet will need separate logic to check the required confirmations and execute the transaction.

### 4. Things to investigate later

- Can a transaction be submitted with an invalid destination?
- Can the amount exceed the wallet's ETH balance?
- What happens if a transaction ID does not exist?
- Can duplicate addresses in the owners array affect confirmation counting?
- How will the wallet prevent a transaction from being executed twice?

These are potential risks or missing checks to investigate, not vulnerabilities confirmed by the three tests.

---

## What I Need to Remember Later

```text
submitTransaction()
    ↓
addTransaction()
    ↓
Get txId
    ↓
confirmTransaction(txId)
```

- `submitTransaction()` combines transaction creation and confirmation.
- `_destination` is the recipient's address.
- `_value` is the proposed amount in wei.
- `txId` identifies the new transaction.
- `internal` prevents direct external calls to `addTransaction()`.
- `external` allows callers to invoke `submitTransaction()`.
- A reverted call rolls back its state changes.
- Creating a transaction is not the same as transferring ETH.

**Main lesson:** Reuse existing functions, limit unnecessary external access, and understand how a revert affects the entire call.

---

## Questions I Still Have

1. How will we execute a transaction after enough owners confirm it?
2. How will the wallet check that enough confirmations exist?
3. What happens if the destination contract refuses ETH?
4. How can we prevent the same transaction from being executed twice?
5. Could loops through a large owners array cause gas problems?

---

## Git Commit

```bash
git add .
git commit -m "learn multisig transaction submission and automatic confirmation"
```
