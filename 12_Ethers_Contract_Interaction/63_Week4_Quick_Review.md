# ⚡ Solidity Week 4 — Quick Review & Auditor Cheat Sheet

> **Goal:** Rapid-scan revision for Solidity fundamentals, smart contract interactions, security pitfalls, and Hardhat testing patterns discovered throughout Week 4.

---

## 📑 Quick Navigation
| Section | Key Concept | Auditor Focus |
|---|---|---|
| 🔓 [Function Visibility](#-function-visibility) | `public` / `external` / `internal` / `private` | Visibility ≠ Access Control |
| 📦 [State Variables](#-state-variables--getters) | Automatic Getters | Unintended storage exposures |
| 👤 [msg.sender vs tx.origin](#-msgsender-vs-txorigin) | Call Chain Origin | Phishing attack vectors |
| 💰 [ETH Values & Balances](#-eth-values--balances) | `msg.value` vs `address(this).balance` | Accounting mismatches |
| ↩️ [Reverts & Error Handling](#-reverts--error-handling) | `require` / `assert` / `revert` / Custom Errors | Gas griefing & state rollback |
| 📞 [receive() vs fallback()](#-receive-and-fallback) | Ether receipt mechanics | Locked ETH & unmatched calldata |
| 🔄 [External Calls & CEI](#-external-calls--reentrancy) | Checks-Effects-Interactions | Reentrancy attacks |
| 🔒 [Locked Funds Detection](#-locked-funds-vulnerability) | Invariants & withdrawal paths | Trapped user deposits |
| 🔌 [Interfaces & ABI](#-interfaces-abi--calldata) | Contract communication & Selectors | Signature mismatches |
| 🏗️ [Constructor & Patterns](#-constructor-overloading--shadowing) | Initialization & scope hygiene | Parameter shadowing bugs |
| 🆕 [Week 4 Deep-Dives](#-week-4-deep-dives--special-discoveries) | `selfdestruct` (EIP-6780), Modifiers, `loadFixture` | Cancun hardfork & snapshot tests |

---

## 🔓 Function Visibility

| Specifier | External Access | Internal Access | Derived Contracts | Gas Efficiency |
|---|:---:|:---:|:---:|---|
| `external` | ✅ Yes | ❌ No (`this.f()` needed) | ❌ No | 🟢 Cheapest for external calls (reads calldata directly) |
| `public` | ✅ Yes | ✅ Yes | ✅ Yes | 🟡 Slightly more gas externally (copies calldata to memory) |
| `internal` | ❌ No | ✅ Yes | ✅ Yes | 🟢 Efficient jumps inside EVM |
| `private` | ❌ No | ✅ Yes | ❌ No | 🔒 Isolated strictly to the declaring contract |

```solidity
// External: best for public API receiving large arrays (saves memory copy gas)
function deposit() external payable { ... }

// Internal: helper functions shared across inheritance tree
function _burn(address account, uint256 amount) internal { ... }
```

> [!WARNING]
> **Visibility ≠ Access Control!**
> Setting a function to `public` or `external` only determines **who can call the entry point**, NOT **who is authorized**. Always pair sensitive functions with modifier guards like `onlyOwner`.

---

## 📦 State Variables & Getters

```solidity
contract Vault {
    uint public totalRaised;       // Auto-generates: function totalRaised() external view returns (uint)
    mapping(address => uint) public balances; // Auto-generates: function balances(address) external view returns (uint)
}
```

* `public` state variables automatically generate **read-only getters**.
* Getters allow outsiders to **inspect** state without incurring gas (when called off-chain via `eth_call`).
* Public state variables **NEVER** allow outsiders to directly mutate storage from outside without a custom setter function.

> [!NOTE]
> Marking a state variable `private` hides it from other contracts, but **everything on-chain is publicly readable** in raw storage slots via `eth_getStorageAt`. Never store plaintext private keys or secrets in contract storage.

---

## 👤 msg.sender vs tx.origin

```
[ Alice (EOA) ] 
       │
       ▼ (calls)
[ Malicious Attack Contract ] (msg.sender = Alice | tx.origin = Alice)
       │
       ▼ (calls)
[ Vulnerable Target Contract ] (msg.sender = Malicious Contract | tx.origin = Alice)
```

| Variable | Definition | Changes During Call Chain? | Safe For Auth? |
|---|---|:---:|:---:|
| `msg.sender` | The **immediate caller** (EOA or intermediary contract) | ✅ YES | 🛡️ **YES** (Standard) |
| `tx.origin` | The **original EOA wallet** that signed the transaction | ❌ NO (Always root EOA) | 🚫 **NEVER** (Vulnerable to phishing) |

```solidity
// ❌ VULNERABLE: Phishing contract can trick owner into transferring funds
function withdrawAll() external {
    require(tx.origin == owner, "Not owner");
    payable(msg.sender).transfer(address(this).balance);
}

// ✅ SECURE: Verifies the direct caller is the owner
function withdrawAll() external {
    require(msg.sender == owner, "Not owner");
    payable(msg.sender).transfer(address(this).balance);
}
```

---

## 💰 ETH Values & Balances

* `msg.value` → Exact amount of Wei sent with **THIS specific call**.
* `address(this).balance` → **TOTAL accumulated ETH** held in the contract's account.

```
Scenario:
1. Contract holds 5 ETH initial balance.
2. Bob calls donate() with 3 ETH attached.

Inside donate():
├── msg.value            == 3 ETH
└── address(this).balance == 8 ETH (includes current msg.value!)
```

```solidity
function donate() external payable {
    require(msg.value > 0, "Zero donation");
    totalDonations += msg.value; // Track contribution
}
```

---

## ↩️ Reverts & Error Handling

When a transaction reverts:
1. **All state modifications** roll back completely (as if the tx never happened).
2. **Ether transferred** is returned to the sender.
3. **Gas consumed up to the revert point is charged** (validators performed computational work).

### Comparison Matrix

| Mechanism | Purpose / Use Case | Gas Refund on Failure? | Custom Messages / Errors? |
|---|---|:---:|---|
| `require(cond, "err")` | User input, balances, external conditions | ✅ Unused gas refunded | String error messages (consumes storage/memory gas) |
| `revert CustomError()` | Explicit failure condition | ✅ Unused gas refunded | ⚡ **Gas-optimized custom errors** (Solidity >=0.8.4) |
| `assert(cond)` | Internal invariants & fatal bugs | ❌ (Pre-0.8.0 burned all; 0.8+ reverts) | `Panic(uint256)` error code |

```solidity
// Custom Error (Best practice for gas)
error InsufficientBalance(uint256 available, uint256 required);

function withdraw(uint256 amount) external {
    if (balances[msg.sender] < amount) {
        revert InsufficientBalance(balances[msg.sender], amount);
    }
    balances[msg.sender] -= amount;
}
```

---

## 📞 receive() and fallback()

```
                    Incoming Tx with ETH / Data
                               │
                     Is calldata empty?
                            /     \
                        YES        NO
                        /            \
          Does receive() exist?   Does function match?
               /         \             /          \
            YES           NO         YES           NO
            /               \         /              \
      receive()         fallback() Execute fn    fallback()
```

| Function | Signature | Calldata Requirement | Must Be Payable? |
|---|---|:---:|:---:|
| `receive()` | `receive() external payable` | Must be **empty** (`msg.data.length == 0`) | ✅ Yes |
| `fallback()` | `fallback() external [payable]` | Triggered on **unmatched calldata** | Optional (Yes if accepting ETH) |

```solidity
// Plain Ether transfers
receive() external payable {
    emit FundsReceived(msg.sender, msg.value);
}

// Low-level relay / unrecognized calls
fallback() external payable {
    emit FallbackCalled(msg.sender, msg.value, msg.data);
}
```

---

## 🔄 External Calls & Reentrancy

Sending ETH via `.call` gives execution control to the recipient before execution finishes:

```solidity
(bool ok, ) = recipient.call{value: amount}("");
require(ok, "Transfer failed");
```

### 🛡️ The CEI Rule (Checks-Effects-Interactions)
1. **Checks:** Validate inputs, balances, permissions (`require`).
2. **Effects:** Update contract storage and balances **FIRST**.
3. **Interactions:** Perform external `.call`, `.transfer`, or token transfers **LAST**.

```solidity
// ❌ VULNERABLE TO REENTRANCY (Interaction before Effect)
function withdraw() external {
    uint256 bal = balances[msg.sender];
    require(bal > 0);
    (bool ok, ) = msg.sender.call{value: bal}(""); // Recipient can re-enter withdraw() here!
    require(ok);
    balances[msg.sender] = 0;
}

// ✅ SECURE (Checks -> Effects -> Interactions)
function withdraw() external {
    uint256 bal = balances[msg.sender];
    require(bal > 0, "No balance");
    
    balances[msg.sender] = 0; // State changed BEFORE external call!
    
    (bool ok, ) = msg.sender.call{value: bal}("");
    require(ok, "Transfer failed");
}
```

---

## 🔒 Locked Funds Vulnerability

> [!CAUTION]
> **The Auditor Invariant Check:**
> *"If Ether or ERC20 tokens can ENTER a contract, is there guaranteed to be a valid, reachable mechanism for them to LEAVE?"*

* If a contract has `payable` functions, `receive()`, or `fallback()`, but **no withdrawal function**, all deposited funds are **permanently locked**.
* Always verify that withdrawal functions have proper access control and do not rely on fragile arithmetic or unbounded loops.

---

## 🔌 Interfaces, ABI & Calldata

### 1. Interface Pattern
Allows Contract A to interact with Contract B without copying Contract B's full implementation:

```solidity
interface IFaucet {
    function withdraw(uint amount) external;
}

contract Caller {
    function triggerWithdraw(address faucetAddress, uint amount) external {
        IFaucet(faucetAddress).withdraw(amount);
    }
}
```

### 2. Function Selectors & Calldata
* **Calldata:** Raw byte array sent in an Ethereum transaction payload.
* **Function Selector:** The first **4 bytes** of `keccak256("functionName(paramType1,paramType2)")` (no spaces!).

```solidity
// Compute selector:
bytes4 selector = bytes4(keccak256("transfer(address,uint256)"));

// Encode manual calldata:
bytes memory data = abi.encodeWithSignature("transfer(address,uint256)", recipient, amount);

// Execute low-level call:
(bool success, bytes memory returnData) = target.call(data);
```

---

## 🏗️ Constructor, Overloading & Shadowing

### 1. Constructor
* Runs **exactly once** at deployment time.
* Sets immutable constants, initial configuration, and assigns `owner = msg.sender`.

### 2. Function Overloading
Multiple functions with the same name, differentiated by parameter types:

```solidity
function set(uint256 value) external { ... }
function set(address account) external { ... }
function set(uint256 value, bool flag) external { ... }
```

### 3. Variable Shadowing Pitfall
Occurs when local/parameter variables use the same name as state variables, hiding the outer scope.

```solidity
contract OwnerStore {
    address public owner;

    // ❌ Shadowing bug: 'owner = owner' assigns param to itself!
    // constructor(address owner) { owner = owner; }

    // ✅ Clean pattern: Prefix parameters with an underscore
    constructor(address _owner) {
        owner = _owner;
    }
}
```

### 4. Tuple & Multiple Return Values
```solidity
function getStats() external pure returns (uint256 sum, uint256 avg, bool isActive) {
    return (100, 25, true);
}

// Destructuring in caller:
(uint256 total, , bool active) = target.getStats(); // Skip unused return values with comma
```

---

## 🆕 Week 4 Deep-Dives & Special Discoveries

### 1. `selfdestruct` & EIP-6780 (Cancun Hardfork)
* **Legacy EVM:** `selfdestruct(recipient)` transferred all ETH and erased contract bytecode from state.
* **Modern EVM (Cancun / EIP-6780):** 
  * Only deletes contract bytecode if deployed and destroyed **in the same transaction**.
  * In subsequent transactions, it **only forwards remaining ETH** to the target; the contract bytecode remains active on-chain!
* **Auditor takeaway:** Do not rely on `selfdestruct` for burning access control or resetting contract state in modern protocols.

---

### 2. `onlyOwner` Modifier Pattern & The `_;` Merge Point
```solidity
abstract contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _; // Target function body executes here!
    }
}

contract Treasury is Ownable {
    function sweepFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
```

---

### 3. Hardhat Testing: `loadFixture`
```javascript
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Vault Contract", function () {
  async function deployVaultFixture() {
    const [owner, user] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();

    return { vault, owner, user };
  }

  it("Should accept deposits", async function () {
    const { vault, user } = await loadFixture(deployVaultFixture);
    await expect(vault.connect(user).deposit({ value: ethers.parseEther("1.0") }))
      .to.changeEtherBalances([user, vault], [ethers.parseEther("-1.0"), ethers.parseEther("1.0")]);
  });
});
```

* **Why `loadFixture`?** Takes an in-memory EVM state snapshot after the first setup and resets back to it instantly for every test.
* **Result:** 10x-50x faster test suites compared to deploying new contracts in `beforeEach`.

---

## 📋 Auditor's Rapid Sanity Checklist
- [ ] Are all state-modifying external functions protected with access control (`onlyOwner`)?
- [ ] Are Ether withdrawals strictly adhering to the **Checks-Effects-Interactions** pattern?
- [ ] Is `msg.sender` used for authorization rather than `tx.origin`?
- [ ] Can incoming Ether ever become trapped (no withdrawal path)?
- [ ] Are all low-level calls (`.call()`) checking the returned boolean success flag?
- [ ] Are `receive()` and `fallback()` functions behaving as intended?
- [ ] Are custom errors used in place of verbose `require` strings to minimize gas footprint?
