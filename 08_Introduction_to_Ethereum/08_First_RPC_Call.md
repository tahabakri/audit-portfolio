# Activity Log: My First JSON-RPC Script

## What I did
- Created a Node.js project and installed the `axios` library.
- Used my Alchemy API key to connect to the Ethereum Mainnet.
- Wrote a script to call the `eth_getBlockByNumber` method.

## What I observed
- The response is a large JSON object containing block metadata.
- I saw the `parentHash` property, which proves how blocks are linked together.
- The block number I requested was `0xb443` (hex), which is Block 46147 (decimal).

## Auditor Note
- **API Security:** I learned that my Alchemy URL contains my API Key. If I upload this script to GitHub with the key visible, anyone can use my "Compute Units."
- **Verification:** By seeing the `transactions` array, I can see every movement of money that happened in this specific 12-second window of history.

## ⚖️ The Wei to ETH Conversion
- **Problem:** Blockchain nodes return balances in Hexadecimal Wei (smallest unit).
- **Tool:** I used `parseInt(hexString)` to get the Decimal Wei.
- **Conversion:** I divided the Wei by 10^18 (1 followed by 18 zeros) to find the human ETH value.
- **Auditor Takeaway:** Always perform math in Wei to avoid "Precision Loss" or rounding bugs.