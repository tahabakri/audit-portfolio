# 92 — Multi-Sig Transaction Struct & Storage

## What I Did

- Added a `Transaction` struct to the `MultiSig` contract.
- The struct stores:
  - transaction destination
  - transaction value in wei
  - whether the transaction has already been executed
- Added a public `transactions` array to store multiple transactions.
- Added a public `transactionCount()` view function.
- `transactionCount()` returns the number of stored transactions.
- Ran the new ABI tests.
- Both tests passed.

---

## What I Expected

I expected each transaction to remember:

```text
where ETH should go
how much ETH should be sent
whether the transaction already executed
```

I also expected the contract to be able to store multiple transactions.

Example:

```text
transactions[0]
transactions[1]
transactions[2]
```

---

## What Actually Happened

The new tests passed:

```text
MultiSig
  ✔ should define the transaction count
  ✔ should define a transactions mapping or array

2 passing
```

So the contract now exposes:

```solidity
transactions(...)
```

and:

```solidity
transactionCount()
```

with the expected types.

---

## What Confused Me

I first needed to understand why the contract needs:

```solidity
bool executed;
```

I understand now that it remembers whether a transaction already happened.

Without something like this, the same transaction could potentially execute again.

Example:

```text
send 1 ETH to Bob
→ executes once
→ should NOT execute again
```

I also confused:

```text
transactions.length
```

with calculating transaction data.

I understand now that:

```text
transactions.length
```

just means:

> how many transactions are stored

I also made some naming mistakes:

```text
transaction
```

instead of:

```text
transactions
```

and:

```text
trasactionCount
```

instead of:

```text
transactionCount
```

The exact names mattered because the tests looked for them in the ABI.

---

## What I Think I Understand Now

### Transaction Struct

The struct is:

```solidity
struct Transaction {
    address destination;
    uint256 value;
    bool executed;
}
```

A struct lets me group related information together.

Each transaction has three pieces of data.

---

### destination

```solidity
address destination;
```

stores:

> the address that should receive the transaction value

Example:

```text
destination = Bob's address
```

means:

> if this transaction executes, the ETH should go to Bob

---

### value

```solidity
uint256 value;
```

stores:

> how much ETH should be sent, measured in wei

Example:

```text
value = 1 ether
```

means the transaction wants to send 1 ETH.

---

### executed

```solidity
bool executed;
```

stores the execution status.

```text
false
→ transaction has not executed yet

true
→ transaction already executed
```

Important:

```text
executed
```

does not mean:

> can this transaction execute?

It means:

> did this transaction already execute?

---

### transactions Array

The contract stores transactions using:

```solidity
Transaction[] public transactions;
```

I read this as:

```text
Transaction[]
→ array containing multiple Transaction structs
```

Example:

```text
transactions[0]
transactions[1]
transactions[2]
```

Each item contains:

```text
destination
value
executed
```

---

### transactionCount()

The function is:

```solidity
function transactionCount() public view returns (uint256) {
    return transactions.length;
}
```

It returns:

> the number of transactions currently stored

Example:

```text
4 stored transactions
```

means:

```solidity
transactions.length
```

returns:

```text
4
```

---

### public view

In:

```solidity
function transactionCount() public view returns (uint256)
```

I understand:

```text
public
→ can be called from outside or inside the contract

view
→ reads state but does not modify it

returns (uint256)
→ returns a whole number
```

---

## Security Thoughts

### Preventing Double Execution

This field is security important:

```solidity
bool executed;
```

If a transaction executes successfully, the contract should eventually mark:

```solidity
executed = true;
```

Then another execution attempt should be rejected.

Auditor question:

> Can the same approved transaction execute twice?

---

### Transaction Data Must Stay Connected

Each stored transaction keeps:

```text
destination
value
executed
```

together in one struct.

Later, confirmations need to apply to the correct stored transaction.

Auditor question:

> Are approvals tied to the exact transaction being executed?

---

### Array Growth

The array:

```solidity
Transaction[] public transactions;
```

can grow as more transactions are proposed.

This is fine for storing and accessing transactions by index.

But as an auditor I should be careful if later code loops through every transaction.

Auditor question:

> Can user-controlled array growth make some operation too expensive?

---

### Transaction Indexes

Transactions will be accessed using indexes:

```text
transactions[0]
transactions[1]
transactions[2]
```

Later, functions may receive a transaction index.

Auditor question:

> What happens if someone supplies an invalid transaction index?

---

## What I Need to Remember Later

- `struct` → groups related data together.
- `Transaction` → describes one multi-sig transaction.
- `destination` → where value should go.
- `value` → amount to send in wei.
- `executed` → whether the transaction already happened.
- `Transaction[]` → array of multiple Transaction structs.
- `transactions.length` → number of transactions stored.
- `transactionCount()` → returns `transactions.length`.
- `executed = false` → not executed yet.
- `executed = true` → already executed.
- Exact function and variable names matter when tests depend on the ABI.

---

## Questions I Still Have

- How will a new transaction be added to `transactions`?
- Who is allowed to submit a transaction?
- How will the contract know whether `msg.sender` is an owner?
- How will confirmations be connected to a specific transaction?
- How will the contract count confirmations?
- How will it stop one owner from confirming the same transaction twice?
- When exactly should `executed` change from `false` to `true`?
- Should `executed` be changed before or after the external ETH transfer?
