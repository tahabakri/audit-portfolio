# Logic: Adding Blocks (The Risk)

## The Code
We used `this.chain.push(newBlock)`.

## Auditor Question
**What stops a hacker from calling `addBlock` 1 million times in 1 second?**
*   **Answer:** Right now? Nothing.
*   **The Attack:** This is a **Denial of Service (DoS)** attack. The hacker fills the blockchain with junk data until the computer crashes.

## The Fix (Coming Soon)
*   **Proof of Work:** We force the hacker to solve a puzzle before adding a block.
*   **Gas Fees:** We charge money to add a block.
*   *Auditor Note:* If a blockchain function is "Free" and "Fast," it is vulnerable to Spam.