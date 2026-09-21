# 88 — Dead Man's Switch

## What I Did

- Built a `Switch` contract that holds ETH for a recipient.
- Made the constructor `payable` so ETH can be deposited when the contract is deployed.
- Stored the deployer as the `owner`.
- Stored a separate `recipient` address.
- Added a `lastPing` timestamp.
- Used `block.timestamp` to track owner activity.
- Created a `ping()` function that only the owner can call.
- Made `ping()` reset the inactivity timer.
- Created a `withdraw()` function.
- Required at least 52 weeks of inactivity before withdrawal can succeed.
- Sent the full contract balance to the stored recipient.
- Checked whether the ETH transfer succeeded.
- Converted the provided ethers v5 tests to ethers v6.
- Ran the Hardhat tests successfully.
- All 7 tests passed.

## What I Expected

I expected:

- the deployer to become the owner
- the recipient address to be stored during deployment
- the owner to be able to call `ping()`
- non-owners to be rejected from calling `ping()`
- `ping()` to restart the 52-week timer
- withdrawal before 52 weeks to revert
- withdrawal after more than 52 weeks to succeed
- the full contract balance to go to the recipient

## What Actually Happened

The contract behaved as expected.

The full test suite passed:

```text
  Switch
    ✔ should not allow the recipient to ping
    ✔ should not allow some other account to ping
    after 70 weeks of inactivity
      ✔ should allow the recipient to withdraw
    after 40 weeks of inactivity since deployment
      ✔ should not allow the recipient to withdraw
      after 40 more weeks of inactivity
        ✔ should allow the recipient to withdraw
      after pinging
        after 40 more weeks of inactivity
          ✔ should not allow the recipient to withdraw
          after 40 more weeks of inactivity
            ✔ should allow the recipient to withdraw

  7 passing (2s)
```

The tests confirmed:

- recipient cannot call `ping()`
- another random account cannot call `ping()`
- withdrawal works after 70 weeks
- withdrawal fails after only 40 weeks
- withdrawal works after enough total inactivity
- calling `ping()` resets the timer
- another 40 weeks after a ping is still not enough
- enough time after the new ping allows withdrawal

## What Confused Me

- At first I struggled to read the contract code directly.
- I needed the contract idea explained in plain English first.
- I confused what should happen to `lastPing`.
- I first thought `lastPing` might become 0.
- I learned that it should instead become the current `block.timestamp`.
- I briefly confused the roles of the owner and recipient.
- I needed to separate:
  - **owner** = keeps the switch alive
  - **recipient** = receives the ETH after inactivity
- I also made some syntax mistakes such as:
  - `fucntion` instead of `function`
  - `timestamp` instead of `block.timestamp`
  - an extra closing brace `}`

## What I Think I Understand Now

The contract stores three important things:

```solidity
address public owner;
address public recipient;
uint256 public lastPing;
```

### Owner

The owner is the address that deploys the contract:

```solidity
owner = msg.sender;
```

Inside the constructor:

```text
msg.sender = deployer
```

So the deployer becomes the owner.

### Recipient

The constructor receives:

```solidity
address _recipient
```

and stores it:

```solidity
recipient = _recipient;
```

The recipient is the address that will eventually receive the ETH if the owner becomes inactive.

### block.timestamp

This gives the current blockchain timestamp.

At deployment:

```solidity
lastPing = block.timestamp;
```

This means:

> The owner is considered active right now.

### ping()

The owner can reset the inactivity timer:

```solidity
function ping() external {
    require(msg.sender == owner, "Not owner");
    lastPing = block.timestamp;
}
```

The owner check:

```solidity
require(msg.sender == owner, "Not owner");
```

means only the owner can successfully reset the timer.

This is important because another address should not be able to keep delaying the withdrawal.

### The 52-Week Check

Withdrawal uses:

```solidity
require(
    block.timestamp >= lastPing + 52 weeks,
    "still active"
);
```

I read this as:

```text
current blockchain time >= last activity time + 52 weeks
```

- If only 40 weeks have passed:
  - `condition = false` → **revert**
- If 70 weeks have passed:
  - `condition = true` → **continue**

### Withdrawal

The contract sends its full ETH balance using:

```solidity
address(this).balance
```

The transfer is:

```solidity
(bool sent,) = payable(recipient).call{
    value: address(this).balance
}("");
```

Then:

```solidity
require(sent, "Transfer failed");
```

checks whether the ETH transfer actually succeeded.

### Important Role Difference

I need to remember:

- **owner** → controls `ping()`, keeps resetting the inactivity timer
- **recipient** → receives the ETH after 52 weeks of inactivity

The caller of `withdraw()` does not automatically receive the ETH.

The ETH always goes to: `recipient`.

---

## Security Thoughts

### Only Owner Can Ping

If anyone could call `ping()`, a malicious user could keep resetting the timer forever.

That would stop the recipient from ever receiving the funds.

So this check matters:

```solidity
require(msg.sender == owner, "Not owner");
```

> **Auditor question:** Who is allowed to delay the switch?  
> **Answer:** Only the owner.

### Withdrawal Timing

The important time condition is:

```solidity
block.timestamp >= lastPing + 52 weeks
```

The contract should not release the ETH before that condition becomes true.

> **Auditor question:** Can anyone bypass or reset the inactivity period unexpectedly?

### Recipient Risk

The recipient address is stored at deployment.

If the wrong address is supplied, the funds may eventually be sent to the wrong place.

There is currently no function to change the recipient.

> **Auditor question:** Is the recipient address trusted and recoverable if entered incorrectly?

### Recipient Contract Can Reject ETH

The withdrawal uses an external call:

```solidity
payable(recipient).call{value: ...}("")
```

If the recipient is a contract that rejects ETH, then:

`sent == false` and the withdrawal reverts.

That could leave the funds permanently locked.

> **Auditor question:** What happens if the recipient cannot receive ETH?

### Anyone Can Trigger Withdrawal

After 52 weeks, `withdraw()` can be called by any address.

But the money still goes to `recipient`.

This is not automatically dangerous because the caller cannot redirect the funds.

Still, the important question is:

> Who can trigger the state transition, and who actually receives the value?

### Timestamp Assumption

The contract depends on:

```solidity
block.timestamp
```

For a 52-week delay, small timestamp manipulation is not very important.

But as an auditor I should remember that block timestamps should not be treated as perfectly precise clocks for short time-sensitive logic.

---

## What I Need to Remember Later

- `msg.sender` → who directly called the function.
- `block.timestamp` → current blockchain time.
- `lastPing = block.timestamp;` → reset the inactivity timer to now.
- `52 weeks` → valid Solidity time syntax.
- `address(this).balance` → all ETH currently held by the contract.
- `payable(recipient).call{value: ...}("")` → send ETH to the recipient using a low-level external call.

---

## Deep-Dive: Key Concepts & Edge Cases (Q&A)

### 1. How Does `ping()` Actually Work in Practice?
- **Blockchains Cannot Push Notifications:** Unlike mobile apps, smart contracts on Ethereum cannot "wake up" by themselves or send an alert asking *"Are you still active?"*
- **Active Check-in:** The owner must proactively send an on-chain transaction calling `ping()` before 52 weeks elapse.
- **Cadence:** The owner does **not** have to ping every single week. Calling `ping()` at week 10, week 30, or week 51 immediately resets the 52-week countdown back to day zero from `block.timestamp`.

### 2. What Happens if Longer Weeks Pass (e.g. 70 or 100 Weeks)?
- As long as `block.timestamp >= lastPing + 52 weeks`, the contract remains in the "unlocked" state indefinitely until `withdraw()` is triggered.
- **Re-locking Edge Case:** If 70 weeks pass and no one calls `withdraw()`, and the owner suddenly recovers their keys or comes back to life and calls `ping()`, the timer resets and the contract **re-locks** for another 52 weeks!

### 3. What if the Recipient is Also Dead, Inactive, or Rejects ETH?
In this basic implementation:
- **If the recipient is an EOA (regular wallet) whose key is lost:** The contract transfers the ETH anyway. The funds become permanently burned / inaccessible.
- **If the recipient is a contract that rejects ETH:** The call `(bool sent,) = payable(recipient).call{value: ...}("")` returns `false`, causing the transaction to revert. The ETH remains permanently locked in the switch contract unless recovered.

### 4. Can We Support Multiple or Backup Recipients?
**Yes!** In production-grade inheritance contracts:
1. **Multiple Recipients (Splitting):**
   ```solidity
   address[] public recipients;
   // In withdraw(): calculate share = address(this).balance / recipients.length
   // and transfer an equal portion to each recipient
   ```
2. **Tiered Heir Hierarchy (Backup Recipient):**
   - Inactive for **52 weeks** $\rightarrow$ Primary recipient can withdraw.
   - Inactive for **104 weeks (2 years)** without primary claim $\rightarrow$ Secondary / backup recipient can withdraw.
3. **Changeable Recipient:**
   - Allow the active owner to update the recipient via an authenticated function:
     ```solidity
     function setRecipient(address _newRecipient) external {
         require(msg.sender == owner, "Not owner");
         recipient = _newRecipient;
     }
     ```

---

## Questions I Still Have

- What happens if the owner loses their private key but is still alive? (Can we use social recovery or multi-sig?)
- Should only the recipient be allowed to call `withdraw()`, or is permissionless withdrawal better?
- Would a pull-payment / claim pattern (where recipient pulls funds) be safer than pushing ETH automatically?
- What other smart contracts use time-based conditions like this? (Vesting schedules, timelocks, DAO voting delays).