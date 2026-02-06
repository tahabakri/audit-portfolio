# Challenge: Brute Forcing a Hash

## 1. The Scenario
*   **The Problem:** We are given a Hash (the fingerprint) and we need to find the Input (the color).
*   **The Constraint:** Hashing is "One-Way," so we cannot reverse the math.
*   **The Vulnerability:** The input has "Low Entropy." We know it MUST be one of 6 colors.

## 2. The Solution (Rainbow Table Attack)
Since the list of possible inputs is small (only 6 colors), we can **Brute Force** it. We hash every possible color until we find a match.

## 3. The Code Solution
```javascript
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

function findColor(hash) {
    // 1. Loop through the known list of "suspects"
    for (let i = 0; i < COLORS.length; i++) {
        
        // 2. Convert string to bytes (computers only speak bytes)
        const byteColor = utf8ToBytes(COLORS[i]);

        // 3. Hash the suspect
        const hashedColor = sha256(byteColor);

        // 4. Compare the "Hex" strings
        if (toHex(hashedColor) === toHex(hash)) {
            return COLORS[i]; // FOUND IT!
        }
    }
}
```

## 4. Auditor's Takeaway
*   **Why was this easy?** Because the list of secrets (COLORS) was small.
*   **Security Lesson:** Never use a password chosen from a small list (like "password123" or dictionary words). Hackers can pre-calculate the hashes (Rainbow Table) and find the match instantly, just like this code did.
