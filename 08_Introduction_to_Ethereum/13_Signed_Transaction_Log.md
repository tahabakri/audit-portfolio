# Activity Log: Automating a Signed Transaction

## 1. The Strategy

- Used the **Alchemy SDK** and **dotenv** to separate secrets from logic.
- Implemented a `.gitignore` to prevent leaking my Private Key to GitHub.

## 2. The Execution

- **Provider:** Alchemy (Connection to Sepolia).
- **Signer:** `new Wallet(PRIVATE_KEY)` (My EOA identity).
- **Process:**
  1. Fetched current Nonce from the network.
  2. Built the transaction object in Wei.
  3. Signed locally, then broadcasted to the world.

## 3. Auditor Observation

- **The Nonce:** I observed that the Nonce increased. This ensures that even if I run the script again, the same transaction cannot be "replayed" with the old signature.

## 🔒 Security Audit: My Workflow

- **Risk:** Leaking Private Keys via GitHub.
- **Defense:** I used a `.env` file for secrets and a `.gitignore` to keep that file local.
- **Verification:** Before pushing, I verified that only my logic (`index.js`) and my notes are tracked by Git.
