# 90 — Multi-Sig Wallet Setup

## What I Did

- Started the Multi-Signature Wallet lesson.
- Created a new Hardhat project in `21_Multi_Sig_Wallet`.
- Created `contracts/MultiSig.sol`.
- Added a public array of owner addresses.
- Added a public `required` value for the number of confirmations needed.
- Built a constructor that receives:
  - the owner addresses
  - the required number of confirmations
- Stored both constructor inputs in contract state.
- Added the MultiSig tests.
- Removed the default Hardhat `Lock.js` test after it caused unrelated failures.
- Updated the provided ethers v5-style test to ethers v6 syntax.
- Ran the tests successfully.
- Both setup tests passed.

---

## What I Expected

I expected the contract to store:

```text
owners = list of wallet owners
required = number of confirmations needed
```

Example:

```text
owners = [Alice, Bob, Charlie]
required = 2
```

means:

```text
2-of-3 multi-sig
```

There are 3 owners total, but only 2 confirmations are required.

---

## What Actually Happened

The final tests passed:

```text
MultiSig
  ✔ should set an array of owners
  ✔ should set the number of required confirmations

2 passing
```

The first test run also failed because the default Hardhat sample test was still there:

```text
test/Lock.js
```

But `Lock.sol` had already been deleted.

So Hardhat tried to test a contract that no longer existed.

After deleting `test/Lock.js`, only the real MultiSig test remained.

---

## What Confused Me

- `address[] public owners;` looked strange at first.
- I learned that:

```text
address[]
```

means:

> an array that can hold multiple Ethereum addresses

- I mixed up:
  - total owners
  - required confirmations

Example:

```text
owners = 3
required = 2
```

means:

```text
3 owners total
2 confirmations needed
```

- I confused:

```solidity
uint256
```

with:

```solidity
_required
```

I understand now:

```text
uint256 = the type
_required = temporary value passed into constructor
required = permanent state variable
```

- I also needed to remember assignment direction:

```solidity
owners = _owners;
```

means:

> take `_owners` from the right side and save it into `owners` on the left side

---

## What I Think I Understand Now

### owners

```solidity
address[] public owners;
```

means:

```text
address[] = multiple Ethereum addresses
public = readable from outside
owners = variable name
```

Example:

```text
owners[0] = Alice
owners[1] = Bob
owners[2] = Charlie
```

---

### required

```solidity
uint256 public required;
```

stores:

> how many owner confirmations are needed

Example:

```text
owners = 3
required = 2
```

means:

```text
3 owners total
2 confirmations required
```

---

### Constructor

```solidity
constructor(address[] memory _owners, uint256 _required) {
    owners = _owners;
    required = _required;
}
```

Mental model:

```text
_owners = temporary deployment input
owners = permanent contract state

_required = temporary deployment input
required = permanent contract state
```

---

### memory

In:

```solidity
address[] memory _owners
```

`memory` means the array exists temporarily while the constructor runs.

Then the data is copied into permanent contract state:

```solidity
owners = _owners;
```

---

## Security Thoughts

### required = 0

A dangerous setup would be:

```text
owners = 3
required = 0
```

That could make the confirmation requirement meaningless.

Auditor question:

> Can a transaction execute without any owner approval?

---

### required > owners.length

Another dangerous setup:

```text
owners = 3
required = 5
```

This is impossible to satisfy.

Only 3 owners exist, but 5 confirmations are required.

That could make the wallet unable to execute transactions.

Auditor question:

> Can the confirmation threshold ever become impossible to reach?

Basic rule:

```text
1 <= required <= owners.length
```

---

### Single Point of Failure

A normal EOA can have:

```text
1 private key
→ 1 compromised key can lose the funds
```

A multi-sig spreads control across several keys.

Example:

```text
2-of-3
```

One compromised key alone is not enough.

But if 2 keys are compromised, the attacker could reach the threshold.

Auditor question:

> How many keys must an attacker compromise to reach the threshold?

---

### Liveness Risk

A higher threshold is not always automatically better.

Example:

```text
4-of-7
```

is harder to compromise than:

```text
2-of-3
```

But if too many honest owners lose access to their keys, the wallet may become unable to act.

Auditor question:

> Can honest owners still reach the threshold if some owners disappear or lose their keys?

---

## Ethers v5 → v6 Test Changes

The lesson test used older ethers syntax.

Old:

```javascript
ethers.provider.listAccounts()
```

Updated:

```javascript
const signers = await ethers.getSigners();
accounts = signers.map((s) => s.address);
```

`getSigners()` returns signer objects.

Then:

```javascript
s.address
```

gets the actual address.

---

Old:

```javascript
await contract.deployed();
```

Updated:

```javascript
await contract.waitForDeployment();
```

---

Old:

```javascript
contract.callStatic.owners(0)
```

Updated:

```javascript
await contract.owners(0);
```

---

## What I Need to Remember Later

- `address[]` → array of Ethereum addresses.
- `owners` → permanent list of wallet owners.
- `required` → number of confirmations needed.
- `2-of-3` → 2 confirmations required from 3 total owners.
- `_owners` → temporary constructor input.
- `_required` → temporary constructor input.
- `memory` → temporary data location.
- `required = 0` can create a security problem.
- `required > owners.length` can make execution impossible.
- A higher threshold improves resistance to compromised keys but can increase liveness risk.

---

## Questions I Still Have

- How will the contract know whether `msg.sender` is one of the owners?
- How will a transaction be submitted?
- How will owners confirm a specific transaction?
- How will the contract stop one owner from confirming the same transaction twice?
- How will the contract stop the same transaction from executing twice?
- How will the contract know when the required threshold has been reached?
- Will it use a transaction ID, nonce, or both?
