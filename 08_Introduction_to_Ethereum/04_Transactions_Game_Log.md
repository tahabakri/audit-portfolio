# Activity Log: The Transactions Game

## 1. Goal
The objective was to move from "Theory" to "Practice" by interacting with a live (test) blockchain.

## 2. Process
- **Wallet Setup:** Installed/Configured MetaMask.
- **Network Isolation:** Toggled from "Ethereum Mainnet" to the "Sepolia Test Network."
- **Resource Acquisition:** Used a Proof-of-Work (PoW) Faucet to earn test ETH.
- **Execution:** Sent a transaction of 0.01 SepoliaETH to a peer address.
- **Verification:** Observed the transaction status and confirmations on Sepolia Etherscan.

## 3. Technical Observations
- **Gas Fees:** Every transaction requires a fee, even on a testnet. 
- **Immutable Record:** Once the transaction was "Confirmed," it appeared on the public block explorer and cannot be deleted.
- **Non-reversibility:** Once I clicked "Confirm," I lost control of the funds. They are moved by the network nodes, not by me.

## 4. Auditor Perspective: Environment Safety
The most important security lesson here is **Environmental Isolation**. 
- As an auditor, I must NEVER test experimental code or interact with unverified contracts using a wallet that holds real assets.
- Keeping a "Development/Test Wallet" separate from a "Personal Wallet" is the first line of defense against total loss of funds.