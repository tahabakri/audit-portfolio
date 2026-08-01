# 61 — tx.origin vs msg.sender Puzzle

## What I Did
- Built WinnerTarget with require(msg.sender != tx.origin)
- Built WinnerClaimer middleman contract to bypass this check
- Proved: direct wallet call FAILS, middleman contract call SUCCEEDS

## What I Learned
- tx.origin = the ORIGINAL wallet that started the entire tx chain
  NEVER changes throughout the whole call chain
- msg.sender = whoever called the CURRENT function directly
  CHANGES depending on who called it (wallet vs another contract)
- Wallet -> Contract A -> Contract B:
  Inside Contract B: tx.origin = wallet, msg.sender = Contract A

## Security Thoughts - IMPORTANT REAL LESSON
- Some developers use tx.origin checks to try to detect
  "is this a real human wallet or a contract calling me?"
- THIS IS NOT RELIABLE - easily bypassed with a middleman contract
  (exactly what I just built)
- Real auditors flag tx.origin-based security checks as WEAK
- Better alternatives exist for actual access control
  (like the onlyOwner modifier pattern learned earlier)

## What Confused Me
- Why not use IP address, location, or 2FA for security?
- Answer: smart contracts have ZERO access to real-world data
  like IP addresses or location - they ONLY see blockchain data
- 2FA would require external systems OUTSIDE the smart contract
- REAL alternative: check against a SPECIFIC KNOWN address
  (like the onlyOwner pattern) instead of trying to detect
  "is this human or bot" which is nearly impossible on-chain