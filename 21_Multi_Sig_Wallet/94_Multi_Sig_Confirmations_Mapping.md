# 94 — Multi-Sig Confirmations Mapping

## What I Did

- Added storage for owner confirmations.
- Created a public nested mapping called `confirmations`.
- The mapping tracks:
  - which transaction
  - which owner
  - whether that owner confirmed
- Ran the new ABI test.
- The test passed.

```text
MultiSig
  ✔ should define a confirmations mapping

1 passing
```

---

## What Confused Me

This line was confusing:

```solidity
mapping(uint256 => mapping(address => bool)) public confirmations;
```

It did not immediately make sense to me because there is a mapping inside another mapping.

The easiest way for me to read it is:

```text
transaction id
→ owner address
→ true or false
```

So I should NOT try to read the whole line at once.

---

## What I Think I Understand Now

### Break the Mapping Into Pieces

The full line is:

```solidity
mapping(uint256 => mapping(address => bool)) public confirmations;
```

Start from the inside:

```solidity
mapping(address => bool)
```

This means:

```text
owner address
→ true or false
```

Example:

```text
Alice → true
Bob   → false
```

That can answer:

> Has this owner confirmed?

---

Now wrap that inside:

```solidity
mapping(uint256 => mapping(address => bool))
```

The first `uint256` is:

```text
transaction ID
```

So now it means:

```text
transaction ID
→ owner
→ confirmed?
```

Example:

```text
transaction 0
→ Alice
→ true
```

or:

```text
transaction 0
→ Bob
→ false
```

---

## How I Should Read It

Do not read:

```solidity
mapping(uint256 => mapping(address => bool))
```

all at once.

Read it like this:

```text
confirmations
→ choose transaction
→ choose owner
→ get true/false
```

That makes this:

```solidity
confirmations[2][alice]
```

much easier.

Read it as:

```text
transaction 2
→ Alice
→ has she confirmed?
```

---

## Example

Suppose:

```solidity
confirmations[0][alice] = true;
confirmations[0][bob] = false;

confirmations[1][alice] = true;
confirmations[1][bob] = true;
```

Then:

```text
Transaction 0
Alice → confirmed
Bob   → not confirmed

Transaction 1
Alice → confirmed
Bob   → confirmed
```

So:

```solidity
confirmations[1][bob]
```

returns:

```text
true
```

because Bob confirmed transaction `1`.

---

## Why We Need Two Keys

One key is not enough.

If we only stored:

```solidity
mapping(address => bool)
```

then we could only know:

```text
Alice confirmed something
```

but not:

```text
which transaction did Alice confirm?
```

We need both:

```text
transaction ID
+
owner address
```

So the contract can remember:

```text
Alice confirmed transaction 0
but maybe not transaction 1
```

---

## Default Value

Mappings return a default value when nothing has been stored yet.

For `bool`, the default is:

```text
false
```

So before Alice confirms transaction `0`:

```solidity
confirmations[0][alice]
```

returns:

```text
false
```

Later, if the contract sets:

```solidity
confirmations[0][alice] = true;
```

then it returns:

```text
true
```

---

## Mental Picture

I can think of it like a table.

```text
              Alice    Bob    Charlie

Transaction 0  true    false   true
Transaction 1  true    true    false
Transaction 2  false   false   false
```

The first key chooses the row:

```text
transaction ID
```

The second key chooses the owner:

```text
owner address
```

The value tells me:

```text
confirmed or not
```

---

## Security Thoughts

This mapping will later help stop one owner from being counted twice.

Example:

```text
Alice confirms transaction 0
→ confirmations[0][Alice] = true
```

If Alice tries to confirm transaction 0 again, the contract can check:

```solidity
confirmations[0][Alice]
```

and see:

```text
true
```

So it knows Alice already confirmed it.

Auditor question:

> Can the same owner confirm the same transaction more than once?

---

## What I Need to Remember Later

```text
mapping(uint256 => mapping(address => bool))
```

means:

```text
transaction ID
→ owner
→ confirmed?
```

The simplest way to read:

```solidity
confirmations[3][bob]
```

is:

> Has Bob confirmed transaction 3?

And:

```text
false = not confirmed
true = confirmed
```

---

## Tiny Memory Trick

Think:

```text
confirmations[TRANSACTION][OWNER]
```

Example:

```solidity
confirmations[2][alice]
```

means:

```text
transaction 2
Alice
confirmed?
```

That is the whole idea.
