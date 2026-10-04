# 93 — Multi-Sig Add Transaction

## What I Did

- Added an `addTransaction()` function to the `MultiSig` contract.
- The function receives:
  - a destination address
  - a transaction value
- Created a new `Transaction` struct in memory.
- Set `executed` to `false` when the transaction is first created.
- Saved the new transaction into the `transactions` array.
- Returned a transaction ID.
- Used `transactions.length` to determine the next transaction ID.

My function:

```solidity
function addTransaction(address _destination, uint256 _value)
    public
    returns (uint256)
{
    uint256 txId = transactions.length;

    Transaction memory transaction = Transaction(
        _destination,
        _value,
        false
    );

    transactions.push(transaction);

    return txId;
}
```

---

## What I Expected

I expected:

```text
addTransaction(destination, value)
```

to:

```text
create a new transaction
→ executed = false
→ store it
→ return its transaction ID
```

I also expected transaction IDs to start from `0`.

Example:

```text
first transaction  → id 0
second transaction → id 1
third transaction  → id 2
```

---

## What Actually Happened

The Solidity contract compiled successfully.

The current test output still showed the previous storage tests:

```text
MultiSig
  ✔ should define the transaction count
  ✔ should define a transactions mapping or array

2 passing
```

So the contract compiles with `addTransaction()`, but I still need to run the new lesson tests that specifically test:

```text
creating a transaction
transactionCount increasing
returned transaction ID
```

---

## What Confused Me

I got confused about:

```solidity
_destination
_value
```

I understand now that the `_` is just a naming convention.

It helps show that these are function inputs:

```text
_destination = temporary destination input
_value = temporary amount input
```

The underscore does not have special Solidity behavior.

I also got confused about:

```solidity
txId
```

I understand now:

```text
txId = transaction ID
```

It is just a short variable name for the number that identifies the transaction.

---

## What I Think I Understand Now

### _destination

```solidity
address _destination
```

means:

> the address that should receive the value if the transaction eventually executes

Example:

```text
_destination = Bob's address
```

---

### _value

```solidity
uint256 _value
```

means:

> how much value the transaction wants to send

In this lesson, the value is measured in wei.

---

### executed = false

When a transaction is first created:

```solidity
false
```

is used because the transaction has only been proposed.

It has not executed yet.

Lifecycle:

```text
transaction created
→ executed = false

later enough confirmations
→ transaction executes
→ executed = true
```

---

### Creating the Struct

This line:

```solidity
Transaction memory transaction = Transaction(
    _destination,
    _value,
    false
);
```

creates a temporary `Transaction` struct.

It matches the struct order:

```solidity
struct Transaction {
    address destination;
    uint256 value;
    bool executed;
}
```

So:

```text
destination = _destination
value = _value
executed = false
```

---

### Why memory?

```solidity
Transaction memory transaction
```

means:

> create a temporary Transaction while this function runs

Then it is stored permanently using:

```solidity
transactions.push(transaction);
```

---

### transactions.push()

```solidity
transactions.push(transaction);
```

means:

> add the new Transaction to the end of the transactions array

Example:

```text
before:

transactions[0]
transactions[1]

push new transaction

after:

transactions[0]
transactions[1]
transactions[2]
```

---

### Transaction IDs

The important line is:

```solidity
uint256 txId = transactions.length;
```

The transaction ID is based on the array index.

Example:

```text
transactions.length = 0
→ next txId = 0

transactions.length = 1
→ next txId = 1

transactions.length = 5
→ next txId = 5
```

Because arrays start at index `0`.

---

### Why Save txId Before push()?

This part confused me at first.

The order is:

```solidity
uint256 txId = transactions.length;
transactions.push(transaction);
return txId;
```

Example:

```text
before push:
transactions.length = 3

existing IDs:
0, 1, 2

next ID:
3
```

So:

```solidity
txId = 3;
```

Then:

```solidity
transactions.push(transaction);
```

makes:

```text
transactions.length = 4
```

But the new transaction is stored at:

```text
transactions[3]
```

So its ID is still `3`.

Mental rule:

```text
save next index first
→ push transaction
→ return saved index
```

---

## Security Thoughts

### executed Starts False

A newly proposed transaction must not start as already executed.

This would be wrong:

```text
new transaction
executed = true
```

because the transaction has not happened yet.

Auditor question:

> Can a newly created transaction incorrectly start in an executed state?

---

### Transaction ID Must Match Storage Position

The returned `txId` should identify the exact stored transaction.

If IDs and array indexes become inconsistent, later confirmations could point to the wrong transaction.

Auditor question:

> Does the returned transaction ID always reference the transaction that was just stored?

---

### Anyone Can Currently Call addTransaction()

Right now the function is:

```solidity
public
```

and there is no owner check yet.

That means any address could currently call:

```solidity
addTransaction(...)
```

The lesson may add owner restrictions later.

Auditor question:

> Who is allowed to propose a transaction?

---

### Invalid Destination

There is currently no check against:

```solidity
address(0)
```

as the destination.

That may or may not be allowed depending on the intended design.

Auditor question:

> Should a transaction be allowed to target the zero address?

---

## What I Need to Remember Later

- `_destination` → destination input.
- `_value` → amount input.
- `_` is only a naming convention.
- `txId` → transaction ID.
- Transaction IDs are zero-based.
- `transactions.length` before `push()` gives the next transaction index.
- `Transaction memory transaction` → temporary struct.
- `transactions.push(transaction)` → save it permanently.
- `executed = false` → newly proposed transaction has not happened yet.
- Save the ID before pushing.

---

## Questions I Still Have

- Should only owners be allowed to call `addTransaction()`?
- Should `address(0)` be rejected as a destination?
- Should `_value` be allowed to be `0`?
- How will owners confirm a specific `txId`?
- How will the contract stop duplicate confirmations?
- When does `executed` become `true`?
- What happens if the ETH transfer fails?
