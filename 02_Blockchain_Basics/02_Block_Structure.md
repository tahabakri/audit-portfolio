# Logic: Block Structure

## 1. Block Height
*   **Definition:** The number of blocks before the current one.
*   **Code:** `blocks.length`
*   **Why it matters:** It acts as the "Index" of the blockchain. In Ethereum, we reference blocks by number (e.g., Block #15,000,000).

## 2. The Chain
*   **Structure:** An Array of Objects.
*   **Genesis Block:** The first block (Block #0).
*   **Auditor Note:** In a real blockchain, simply "pushing" a block isn't enough. We need to link it to the *previous* block using a Hash. But for this step, we are just learning the data structure.