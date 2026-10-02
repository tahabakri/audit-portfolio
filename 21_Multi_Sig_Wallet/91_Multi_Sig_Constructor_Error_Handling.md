# 91 — Multi-Sig Constructor Error Handling

## What I Did

- Added constructor validation to the `MultiSig` contract.
- Prevented deployment when:
  - no owner addresses are provided
  - `required` confirmations is `0`
  - `required` confirmations is greater than the number of owners
- Kept validation before saving state.
- Ran the updated Hardhat tests.
- All 5 tests passed.

---

## What I Expected

I expected valid multi-sig settings to deploy successfully.

Example:

```text
owners = 3
required = 2
```

This should work because:

```text
2 <= 3
```

I expected invalid configurations to revert.

Examples:

```text
owners = 0
required = 1
```

```text
owners = 3
required = 0
```

```text
owners = 3
required = 4
```

---

## What Actually Happened

The updated tests passed:

```text
MultiSig
  for a valid multisig
    ✔ should set an array of owners
    ✔ should set required confirmations
  for a multisig with no owners
    ✔ should revert
  for a multisig with no required confirmations
    ✔ should revert
  for a multisig with more required confirmations than owners
    ✔ should revert

5 passing
```

So the constructor now rejects the three bad configurations.

---

## What Confused Me

I first got confused about what should go inside `require(...)`.

I thought about checking:

```solidity
_owners.length == 0
```

But `require(...)` should contain the condition that must be true for execution to continue.

So the correct check is:

```solidity
require(_owners.length > 0, "Owners required");
```

I also initially placed the `require(...)` checks after:

```solidity
owners = _owners;
required = _required;
```

I learned that validation should come first.

Mental order:

```text
validate inputs
→ if valid, store state
```

---

## What I Think I Understand Now

### require()

`require(...)` means:

> this condition must be true, otherwise revert

Example:

```solidity
require(_required > 0, "Required confirmations must be greater than zero");
```

If:

```text
_required = 2
```

then:

```text
2 > 0
→ true
→ continue
```

If:

```text
_required = 0
```

then:

```text
0 > 0
→ false
→ revert
```

---

### No Owners Check

This check:

```solidity
require(_owners.length > 0, "Owners required");
```

prevents deployment with:

```text
owners = []
```

because:

```text
_owners.length = 0
```

A multi-sig with no owners would be unusable.

---

### Required Cannot Be Zero

This check:

```solidity
require(_required > 0, "Required confirmations must be greater than zero");
```

prevents:

```text
required = 0
```

If zero confirmations were allowed, the approval threshold would not make sense.

---

### Required Cannot Exceed Owners

This check:

```solidity
require(_required <= _owners.length, "Too many required confirmations");
```

prevents:

```text
owners = 3
required = 4
```

because:

```text
4 <= 3
→ false
```

The wallet could never collect enough confirmations.

---

## Main Invariant

The important rule is:

```text
1 <= required <= owners.length
```

And also:

```text
owners.length > 0
```

That means:

```text
at least one owner exists
required confirmations are not zero
required confirmations are actually reachable
```

---

## Security Thoughts

### Locked Funds Risk

If:

```text
owners = 3
required = 5
```

then the wallet can never reach 5 confirmations.

That could permanently prevent transactions from executing.

Auditor question:

> Can the required threshold ever become impossible to reach?

---

### Zero Threshold Risk

If:

```text
required = 0
```

the confirmation requirement could become meaningless.

Auditor question:

> Can a transaction execute without any owner approval?

---

### Constructor Validation Matters

The dangerous configuration should be rejected at deployment time.

Instead of allowing a broken wallet to exist:

```text
bad input
→ deploy anyway
→ funds may later become stuck
```

we want:

```text
bad input
→ constructor reverts
→ broken wallet never deploys
```

---

### Validate Before State Assignment

The constructor now follows:

```solidity
constructor(address[] memory _owners, uint256 _required) {
    require(_owners.length > 0, "Owners required");
    require(_required > 0, "Required confirmations must be greater than zero");
    require(_required <= _owners.length, "Too many required confirmations");

    owners = _owners;
    required = _required;
}
```

Mental model:

```text
check first
→ save second
```

---

## What I Need to Remember Later

- `require(condition, "message")` → revert if condition is false.
- `_owners.length > 0` → at least one owner must exist.
- `_required > 0` → at least one confirmation must be required.
- `_required <= _owners.length` → threshold must be reachable.
- Good constructor validation can prevent permanently broken contract setups.
- Important multi-sig invariant:

```text
1 <= required <= owners.length
```

- Think about both:
  - theft risk
  - liveness / locked-funds risk

---

## Questions I Still Have

- Should duplicate owner addresses be rejected?
- Should `address(0)` be allowed as an owner?
- How will the contract check whether `msg.sender` is actually an owner?
- How will transactions be submitted?
- How will confirmations be stored?
- How will the contract stop one owner from confirming twice?
- How will the contract stop the same transaction from executing twice?
