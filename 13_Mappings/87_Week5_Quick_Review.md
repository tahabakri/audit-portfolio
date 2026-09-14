# ⚡ Solidity Week 5 — Quick Review & Auditor Cheat Sheet

> **Goal:** The ultimate rapid-scan revision and emergency reference guide for mappings, events, arrays, structs, storage mechanics, debugging, and security patterns discovered building an Escrow system and voting DAO. **Whenever you feel stuck or lost, jump here.**

---

## 📑 Master Navigation Index
| Section | Core Topic | Auditor & Developer Focus |
|---|---|---|
| 🗺️ [Mappings](#-mappings) | Hash table key→value lookups | Default values, no iteration, storage slot hashing |
| 📢 [Events & Logs](#-events--logs) | On-chain logging for off-chain apps | Indexed topics, filters, logs vs storage gas |
| 📚 [Arrays & Data Locations](#-arrays--data-locations) | Fixed vs dynamic, `calldata` vs `memory` vs `storage` | Loop gas DoS, memory vs storage pointer trap |
| 🧱 [Structs & Enums](#-structs--enums) | Grouped custom types & state machines | Struct arrays, named initialization, tuple ABIs |
| 🔐 [Escrow & Payment Patterns](#-escrow--payment-patterns) | Arbiter trust, Pull vs Push payments | Single point of failure, DoS with unexpected revert |
| ♻️ [DRY Code & Function Visibility](#-dry-code--function-visibility) | Internal helpers vs public/external | Reusability, gas savings, internal call dispatch |
| 🚨 [Emergency Debugging Guide](#-emergency-debugging-guide-why-did-my-tx-revert) | "Why is my transaction reverting?" | Panic codes, missing reason strings, MetaMask desync |
| 🏎️ [Storage Layout & Gas Optimization](#-storage-layout--gas-optimization-deep-dive) | Slot packing, EVM word alignment | Struct packing, Swap & Pop array deletion |
| ⚡ [ethers.js v5 vs v6 Cheat Sheet](#-ethersjs-v5-vs-v6-syntax-cheat-sheet) | Frontend & test helper syntax | `parseEther`, BigNumber vs BigInt, event filters |
| 🗂️ [Week 5 Lesson Map](#-week-5-lesson-map-where-did-i-build-this) | Fast index to all 23 lessons | Direct lookup for contracts, tests, and writeups |
| 📋 [Auditor's Final Sanity Checklist](#-auditors-rapid-sanity-checklist) | Pre-audit sanity verification | Rapid verification list before signing off |

---

## 🗺️ Mappings

```solidity
mapping(address => uint) public balances;
mapping(address => mapping(uint => bool)) public votesPerProposal; // nested mapping
mapping(address => User) public users;                             // mapping to struct
```

### Key Technical Properties
* **O(1) Instant Lookup:** No looping needed, execution cost is independent of size.
* **No Length & No Iteration:** Mappings do not store keys or count. You cannot call `balances.length` or loop through `for (key in mapping)`.
* **Zero-Initialization (The Default Value):** Unset keys return default values (`0`, `false`, `address(0)`), **never an error or null**.
* **Storage Slot Calculation:** A mapping entry is stored at `keccak256(abi.encode(key, slotPosition))`. Because hashes are spread uniformly across $2^{256}$ space, collisions are virtually impossible.

### The "Already Done" / Existence Pattern
```solidity
// ✅ PREFERRED: Explicit boolean flag inside the record
struct User {
    uint balance;
    bool isActive; // explicit indicator
}
mapping(address => User) public users;

function register() external {
    require(!users[msg.sender].isActive, "Already registered");
    users[msg.sender] = User({balance: 100, isActive: true});
}
```

> [!WARNING]
> **The Default Value Trap:**
> A mapping returning `0` or `false` can mean "this address has never interacted" OR "this address legitimately has a zero balance / voted false".
> Never use `balances[addr] != 0` to check if an account exists if their balance could legitimately reach zero! Always use a dedicated `bool hasJoined` flag.

---

## 📢 Events & Logs

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
event Approved(uint balance);

function transfer(address to, uint amount) external {
    balances[msg.sender] -= amount;
    balances[to] += amount;
    emit Transfer(msg.sender, to, amount);
}
```

### Key Technical Properties
* **Logs $\neq$ Contract Storage:** Events are written to the transaction receipt's Bloom filter and logs trie. They cost vastly less gas than writing to contract storage (`SSTORE`), but **smart contracts cannot read them back**.
* **One-Way Telegraph:** Emit events for frontend reactivity (MetaMask notifications, graph indexers, subgraph sync, audit trails).
* **Indexed Parameters (Topics):**
  * Maximum **3 indexed parameters** per event (`LOG1` through `LOG4`).
  * `Topic 0` is automatically reserved for the `keccak256` hash of the event signature: e.g. `keccak256("Transfer(address,address,uint256)")`.
  * Indexed fields allow off-chain nodes to filter: `eth_getLogs({ fromBlock, topics: [transferTopic, null, myAddress] })`.
  * **Non-indexed parameters** are ABI-encoded together in the log `data` payload (cheaper to emit, but cannot be searched directly).

```javascript
// Reading events in ethers.js
const filter = contract.filters.Transfer(myAddress, null); // Transfers FROM myAddress
const logs = await contract.queryFilter(filter, -1000);   // Last 1000 blocks
```

---

## 📚 Arrays & Data Locations

### Array Matrix
| Type | Declaration | Resizable? | `.push()` / `.pop()`? | Gas Characteristics |
|---|---|:---:|:---:|---|
| **Fixed Storage** | `uint[5] public nums;` | ❌ No | ❌ No | Cheap slot allocation, bounded |
| **Dynamic Storage** | `uint[] public nums;` | ✅ Yes | ✅ Yes | Slot stores `length`, elements hashed |
| **Fixed Memory** | `uint[5] memory nums;` | ❌ No | ❌ No | Temporary RAM, clears after tx |
| **Dynamic Memory** | `uint[] memory nums = new uint[](size);` | ❌ No (size fixed at allocation) | ❌ No | Cannot resize or `.push()` |

### Data Locations Comparison
| Location | Mutability | Lifetime | Gas Cost | Where Used |
|---|---|---|---|---|
| `storage` | Mutable (writes persist) | Permanent on blockchain | Very Expensive (`SSTORE` / `SLOAD`) | State variables & storage pointers |
| `memory` | Mutable (local copy) | Exists only during function call | Inexpensive (expands dynamically) | Intermediate computations & returns |
| `calldata` | **Immutable** (read-only) | Exists only during function call | **Cheapest** (direct slice of tx payload) | External function arguments |

### ⚠️ The Fatal Storage vs Memory Mutation Bug
```solidity
struct Member {
    address addr;
    uint score;
}
Member[] public members;

// ❌ CRITICAL BUG: 'memory' creates a temporary copy!
function updateScoreBroken(uint index, uint newScore) external {
    Member memory m = members[index]; // COPIED to memory!
    m.score = newScore;               // Modifies only temporary copy!
    // Transaction finishes -> memory wiped -> state variable is UNCHANGED!
}

// ✅ FIXED: 'storage' creates a direct pointer to blockchain state
function updateScoreFixed(uint index, uint newScore) external {
    Member storage m = members[index]; // POINTER to contract storage!
    m.score = newScore;                // Directly mutates blockchain state!
}
```

> [!CAUTION]
> **Gas Denial of Service (DoS) Warning:**
> Never loop through a dynamic storage array of unknown or user-controllable length (e.g. `for (uint i = 0; i < members.length; i++)`). If the array grows to 5,000 members, the function will exceed the block gas limit (30M gas) and **become permanently uncallable (bricked)**. Use a mapping with an index counter or off-chain pagination.

---

## 🧱 Structs & Enums

```solidity
enum Status { Pending, Approved, Rejected }

struct Proposal {
    uint id;
    string description;
    Status status;
    address creator;
    uint yesVotes;
    uint noVotes;
}

Proposal[] public proposals;
```

### Best Practices & Mechanics
1. **Named Initialization (Recommended):**
   `Proposal({ id: 1, description: "Fund", status: Status.Pending, creator: msg.sender, yesVotes: 0, noVotes: 0 })`
   * Prevents catastrophic field mismatch bugs if someone reorders struct variables later!
2. **Positional Initialization:**
   `Proposal(1, "Fund", Status.Pending, msg.sender, 0, 0)` — order must match declaration exactly.
3. **Structs in ABI:** Modern Solidity (0.8+) natively supports structs in external function parameters and return types (encoded as `tuples`).

---

## 🔐 Escrow & Payment Patterns

```solidity
contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved;

    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    event Approved(uint balance);

    function approve() external {
        require(msg.sender == arbiter, "Only arbiter can approve");
        require(!isApproved, "Already approved");
        
        isApproved = true; // Checks-Effects-Interactions (CEI)
        uint balance = address(this).balance;
        
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");
        
        emit Approved(balance);
    }
}
```

### Security Implications & Auditor Notes
1. **Single Point of Failure (SPOF):** The arbiter is a trusted centralized party. If the arbiter loses their private key, the depositor's ETH is **locked forever**.
2. **Checks-Effects-Interactions (CEI):** Always set `isApproved = true` **before** performing the external `.call{value: balance}("")` to prevent potential reentrancy attacks or double-approvals.
3. **Pull vs Push Payments:**
   * **Push Payment (Direct call):** `beneficiary.call{value: balance}("")`. If `beneficiary` is a malicious contract whose `receive()` function reverts (`revert()`), the arbiter's `approve()` will **revert every time**, permanently locking the funds!
   * **Pull Payment (Withdrawal Pattern):**
     ```solidity
     // Arbiter sets allowance:
     approvedBalance[beneficiary] += balance;
     // Beneficiary withdraws separately:
     function withdraw() external { ... }
     ```

---

## ♻️ DRY Code & Function Visibility

### Visibility Quick Guide
| Visibility | Callable from External? | Callable Internally? | Gas Cost |
|---|:---:|:---:|---|
| `external` | ✅ Yes (EOA & other contracts) | ❌ No (unless using `this.fn()`, which wastes gas) | Cheapest for external callers with `calldata` |
| `public` | ✅ Yes | ✅ Yes (jumps directly via internal subroutine) | Slightly more bytecode than external |
| `internal` | ❌ No | ✅ Yes (this contract & derived children) | Fast, no calldata decoding needed |
| `private` | ❌ No | ✅ Yes (ONLY this exact contract, not children) | Private logic |

```solidity
// When reusing a function internally: make it 'public' or write a separate 'internal' helper:
function hasVoted(address voter) public view returns (bool) {
    return votes[voter].voter != address(0);
}

function vote(Choices choice) external {
    require(!hasVoted(msg.sender), "Already voted"); // Valid internal call
    // ...
}
```

---

## 🚨 Emergency Debugging Guide ("Why Did My Tx Revert?")

### 1. Common Solidity Revert Reasons
| Symptom / Error | Root Cause | How to Fix |
|---|---|---|
| `Transaction reverted without a reason string` | Failed `require(...)` with no string message, or caller failed access check | Add explicit error messages to all `require(condition, "Descriptive reason")` |
| `Panic(0x11): Arithmetic underflow or overflow` | Subtraction result would be negative (e.g. `0 - 1`), or addition exceeds type limit | Ensure balance is checked `require(bal >= amount)` before subtracting |
| `Panic(0x32): Array out of bounds` | Accessed `arr[i]` where `i >= arr.length` | Check `arr.length > 0` and bounds before indexing |
| `Panic(0x01): Assert evaluated to false` | An `assert(false)` failed, indicating a broken internal invariant | Check for severe logic flaw in contract invariants |
| `Failed to send Ether` | `beneficiary.call{value: x}("")` returned `false` | Receiver contract rejected ETH (lacks `receive()` or reverted) |
| `Function does not exist / unrecognized selector` | Calling a contract function that wasn't compiled or wrong ABI | Run `npx hardhat compile` and update the frontend ABI |

### 2. Hardhat & MetaMask Localhost Issues
* **Nonce Too High / Transaction Stuck Pending:**
  * *Cause:* You restarted your local Hardhat node (`npx hardhat node`), which reset the blockchain back to block 0, but MetaMask still thinks the account is on nonce #14.
  * *Fix:* In MetaMask $\rightarrow$ **Settings** $\rightarrow$ **Advanced** $\rightarrow$ **Clear activity tab data** (or Reset Account).
* **"We were unable to estimate gas":**
  * *Cause:* Hardhat simulated the transaction (`eth_estimateGas`) and it reverted immediately! Usually because the wrong account is active (e.g. Depositor attempting to call `approve()` instead of the Arbiter).
  * *Fix:* Look at Hardhat terminal logs to see which `require()` failed, then switch accounts.

---

## 🏎️ Storage Layout & Gas Optimization Deep Dive

### Storage Slot Packing (32-Byte Words)
The EVM stores state variables in 32-byte (256-bit) slots. Variables declared sequentially are packed into the same slot if their combined size $\le 32$ bytes.

```solidity
// ❌ UNOPTIMIZED: Takes 3 separate 32-byte slots (3 * 20,000 gas on first write = 60,000 gas!)
uint128 a; // Slot 0 (16 bytes used, 16 wasted)
uint256 b; // Slot 1 (32 bytes used - cannot fit in Slot 0)
uint128 c; // Slot 2 (16 bytes used)

// ✅ OPTIMIZED: Takes 2 slots (Packed!)
uint128 a; // Slot 0 (16 bytes)
uint128 c; // Slot 0 (16 bytes -> packs perfectly with 'a' into 32 bytes!)
uint256 b; // Slot 1 (32 bytes)
```

### Deleting Array Elements (Swap & Pop)
Standard `delete arr[i]` **does not shrink the array**; it merely resets `arr[i]` to `0` and leaves an empty gap.
To delete an element at `index` in $O(1)$ gas without leaving empty holes:

```solidity
function removeElement(uint index) internal {
    require(index < arr.length, "Out of bounds");
    arr[index] = arr[arr.length - 1]; // Move last element to the target hole
    arr.pop();                        // Remove the duplicate last element
}
```

---

## ⚡ ethers.js (v5 vs v6) Syntax Cheat Sheet

| Action | ethers.js v5 (Our Escrow Project) | ethers.js v6 (Modern Standard) |
|---|---|---|
| **Parse ETH to Wei** | `ethers.utils.parseEther("1.0")` | `ethers.parseEther("1.0")` |
| **Format Wei to ETH** | `ethers.utils.formatEther(weiBigNumber)` | `ethers.formatEther(weiBigInt)` |
| **Check Address Validity** | `ethers.utils.isAddress(addr)` | `ethers.isAddress(addr)` |
| **Web3 Provider** | `new ethers.providers.Web3Provider(window.ethereum)` | `new ethers.BrowserProvider(window.ethereum)` |
| **Get Signer** | `provider.getSigner()` (sync) | `await provider.getSigner()` (async promise) |
| **Deploy Contract** | `const factory = new ethers.ContractFactory(abi, bin, signer); await factory.deploy(...);` | Same API, returns Contract with `.waitForDeployment()` |
| **Listen to Event** | `contract.on('Approved', (balance) => { ... })` | Same API |

---

## 🗂️ Week 5 Lesson Map ("Where Did I Build This?")

| File | Topic | Key Files Created / Concepts Mastered |
|---|---|---|
| [`64_Mappings.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/64_Mappings.md) | Mapping basics | `mapping(address => bool)`, default values |
| [`65_Members_Mapping.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/65_Members_Mapping.md) | Membership tracking | Adding/removing users via boolean mapping |
| [`66_Mapping_To_Struct.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/66_Mapping_To_Struct.md) | Struct mappings | `mapping(address => User)`, custom fields |
| [`67_Transfer_With_Struct.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/67_Transfer_With_Struct.md) | Value transfer | Safe arithmetic, updating balances in structs |
| [`68_Nested_Mappings.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/68_Nested_Mappings.md) | 2D Mappings | `mapping(address => mapping(address => bool))` |
| [`69_Contract_Puzzles.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/69_Contract_Puzzles.md) | Security challenges | Solving byte manipulation & access puzzles |
| [`70_Events.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/70_Events.md) | Event emission | `event Transfer(...)`, receipt logs |
| [`71_Local_Hardhat_Games.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/71_Local_Hardhat_Games.md) | Hardhat interaction | Debugging transactions on local Hardhat nodes |
| [`72_Events_Deployed.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/72_Events_Deployed.md) | Testing events | Ethers event listening in test assertions |
| [`73_Events_Multiple_Arguments.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/73_Events_Multiple_Arguments.md) | Complex event signatures | Packing multi-field events |
| [`74_Indexed_Events.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/74_Indexed_Events.md) | Topic filters | `indexed` keyword, filter queries |
| [`75_Escrow_Basics.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/75_Escrow_Basics.md) | Escrow core | 3-party architecture, arbiter authorization |
| [`76_Arrays_And_Structs.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/76_Arrays_And_Structs.md) | Arrays + Structs | Storing collections of custom data types |
| [`77_Fixed_Arrays_Data_Location.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/77_Fixed_Arrays_Data_Location.md) | Fixed arrays | Sizing, memory vs storage boundaries |
| [`78_Dynamic_Arrays.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/78_Dynamic_Arrays.md) | Resizable arrays | `.push()`, `.pop()`, length management |
| [`79_Stack_Club.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/79_Stack_Club.md) | LIFO array pattern | Push/pop stack membership |
| [`80_Structs_With_Enums.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/80_Structs_With_Enums.md) | State transitions | Enums inside structs for lifecycle states |
| [`81_Structs_In_ABI.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/81_Structs_In_ABI.md) | ABI tuples | Passing and returning structs to/from frontends |
| [`82_Struct_Arrays.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/82_Struct_Arrays.md) | Array of structs | Storing and searching vote lists |
| [`83_DRY_Code_Shared_Function.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/83_DRY_Code_Shared_Function.md) | Shared helpers | Refactoring duplicate checks into internal routines |
| [`84_Vote_Once.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/84_Vote_Once.md) | Double-voting guards | Preventing duplicate submissions |
| [`85_Change_Vote.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/85_Change_Vote.md) | Vote modification | Updating existing struct state via storage references |
| [`86_Escrow_DApp_FrontEnd.md`](file:///c:/Users/tahab/Downloads/audit-portfolio/13_Mappings/86_Escrow_DApp_FrontEnd.md) | Full-stack DApp | MetaMask integration, real `msg.sender` testing |

---

## 📋 Auditor's Rapid Sanity Checklist

When auditing or submitting any contract using Week 5 concepts, check off every box:

- [ ] **Mapping Defaults:** Does every mapping read account for the default zero value without misinterpreting it as active data?
- [ ] **Unbounded Array Loops:** Are there any `for` loops iterating over dynamic storage arrays without an explicit maximum bound?
- [ ] **Storage Pointer Verification:** Are state-mutating functions using `storage` references rather than accidental `memory` copies?
- [ ] **Arbitration Resilience:** Does the Escrow system have a dispute deadline, timeout, or multi-signature fallback if the arbiter disappears?
- [ ] **Reentrancy Protection (CEI):** Are state flags (`isApproved = true`, `balances -= amount`) updated **before** external Ether transfers?
- [ ] **External vs Public Visibility:** Are functions callable only from outside marked `external` to save gas on `calldata` decoding?
- [ ] **Swap & Pop Deletion:** If array elements are deleted, are they properly removed via Swap & Pop instead of leaving silent gaps with `delete arr[i]`?
- [ ] **Event Coverage:** Are all critical state transitions (`Transfer`, `Approved`, `VoteCast`) broadcasting events with indexed address topics?